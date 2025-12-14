import { readFile, sum } from "../utils.js"

type Region = {
    width: number,
    height: number,
    polyominoCounts: number[]
}

type PolyominoCell = 0 | 1
type Polyomino = PolyominoCell[][]

export function part1(filePath: string): number {
    let {
        regions
    } = parseInput(filePath)

    let possiblyFillableRegions = regions.filter((region: Region) => {
        let totalRegionArea = region.width * region.height
        let totalPolyominoArea = 9 * sum(region.polyominoCounts)
    
        return totalRegionArea >= totalPolyominoArea
    })

    return possiblyFillableRegions.length
}

export function parseInput(filePath: string): {polyominos: Polyomino[], regions: Region[]} {
    let data: string = readFile(filePath)
    let splitIndex = data.lastIndexOf("#") + 1
    let polyominos = data
        .substring(0, splitIndex)
        .trim()
        .split("\n\n")
        .map((row: string) => 
            row.substring(3, row.length)
        .split("\n")
        .map((s: string) => s.split("").map((c: string) => c == "#" ? 1 : 0)))

    let regions = data
        .substring(splitIndex + 1, data.length)
        .trim()
        .split("\n")
        .map((row:string) => row.split(": "))
        .map(([dimensions, polyominoCountString]: string[]) => {
            let [width, height] = dimensions.split("x").map(Number)
            let polyominoCounts = polyominoCountString.split(" ").map(Number)
            
            return {
                width,
                height,
                polyominoCounts
            }
        })

    return {
        polyominos, 
        regions
    }
}