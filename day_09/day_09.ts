import { readFile } from "../utils.js"

const DEBUG = false
type Point = number[]

type LineSegment = {
    a: Point,
    b: Point
}

function log(...args) {
    if (DEBUG) {
        console.log(...args)
    }
}

// l1 is always drawn horizontally from the cornerPoint x-position to the rightmost tile of the polygon + 1
// l2 is drawn vertically or hoziontally between two red tiles of the polygon
export function intersect(l1: LineSegment, l2: LineSegment) {
    let minY = Math.min(l2.a[1], l2.b[1])
    let maxY = Math.max(l2.a[1], l2.b[1])

    // l1 is always drawn left to right 
    let minX = Math.min(l1.a[0], l1.b[0])
    let maxX = Math.max(l1.a[0], l1.b[0])
    
    if ( (minY < l1.a[1] && l1.a[1] < maxY) && // y between
         (minX < l2.a[0] && l2.a[0] < maxX)    // x between
        ) {
        return true
    }

    return false
}

function square(leftPoint: Point, rightPoint: Point): number {
    return (Math.abs(leftPoint[0] - rightPoint[0]) + 1) * (Math.abs(leftPoint[1] - rightPoint[1]) + 1)
}

function parseFile(filePath: string) {
    return readFile(filePath)
        .split("\n")
        .map((row:string) => 
            row.split(",").map((s: string) => Number(s))
        )
}

export function part1(filePath: string): number {
    let g = parseFile(filePath)

    let maxSquare = 0

    for (let i = 0; i < g.length; i++) {
        for (let j = i + 1; j < g.length; j++) {
            maxSquare = Math.max(maxSquare, square(g[i], g[j]))
        }
    }

    return maxSquare
}

function cornerPoints(a: Point, b: Point): Point[] {
    let [ax, ay] = a
    let [bx, by] = b

    if (ay == by || ax == bx) {
        return []
    }

    return [
        [ax,by],
        [bx,ay]
    ]
}

export function part2(filePath: string): number {
    /* The idea here was to start with the same procedure as part 1:
        - Go through all pairs of redTiles forming the corresponding rectangles
        - Then filter them by checking that their other cornerPoint's are also inside the polygon, by:
            - Drawing a line segment starting from the cornerPoint over the rightmost edge of the polygon
            - Then count how many times the line segment crossed the polygons borders
            - If the count is odd, the cornerPoint is inside the polygon, and if even, its outside
            (This is the known as the ray casting solution to the point-in-polygon problem)
        - If both cornerPoint's are inside the polygon this is a valid rectangle, otherwise it's not
        There's something wrong with the ray casting procedure as this implementation gives the same answer
        as part 1, which should be an invalid rectangle in this case.
    */
    let redTiles = parseFile(filePath)
    let edges: LineSegment[] = []
    let rightMostRedTileX = 0
    for (let [rx] of redTiles) {
        rightMostRedTileX = Math.max(rightMostRedTileX, rx)
    }
    
    for (let i = 0; i < redTiles.length; i++) {
        let nextIndex = (i+1) % redTiles.length
      
        // only vertical edges
        if (redTiles[i][0] == redTiles[nextIndex][0]) {
            edges.push({
                a: redTiles[i],
                b: redTiles[nextIndex]
            })
        }
    }

    log("edges")
    log(edges)

    let maxSquare = 0

    for (let i = 0; i < redTiles.length; i++) {
        for (let j = i + 1; j < redTiles.length; j++) {
            let candidateSquare = square(redTiles[i], redTiles[j])
 
            log("trying out square with redTiles",redTiles[i],"and",redTiles[j])
            log("candidateSquare is", candidateSquare)
            
            if (candidateSquare > maxSquare) {
                log("candidateSquare > maxSquare, so proceed with check")
                
                let otherCornerPoints = cornerPoints(redTiles[i], redTiles[j])
                
                log({otherCornerPoints})
                
                let allCornerPointsInside = otherCornerPoints.every((cornerPoint) => {
                    let intersectionCount = edges.filter((edge) => {
                        return intersect(
                            {a: cornerPoint, b: [rightMostRedTileX + 1, cornerPoint[1]]}, 
                            edge)
                    }).length
                    log({intersectionCount})
                    return intersectionCount % 2 > 0
                })

                
                if (allCornerPointsInside) {
                    log(`set maxSquare to: ${candidateSquare}`)
                    log(`using ${redTiles[i]} and ${redTiles[j]}`)
                    log("\n")
                    
                        maxSquare = candidateSquare
                }
            }
        }
    }


    return maxSquare
}