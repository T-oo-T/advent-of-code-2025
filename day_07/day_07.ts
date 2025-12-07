import { readFile } from "../utils.js"

function printMatrix(g: string[][]) {
    let out = ""
    for (let i = 0; i < g.length; i++) {
        for (let j = 0; j < g[i].length; j++) {
            out += g[i][j]
        }
        //console.log(out)
        out=""
    }
}

export function part1(filePath: string) {
    let g = readFile(filePath).split("\n").map((row:string) => row.split(""))
    let beamSpawns: Set<string> = new Set()
    let coord = (i: number, j: number): string => `${i},${j}`
    
    for (let i = 0; i < g.length; i++) {
        for (let j = 0; j < g[i].length; j++) {
            if (g[i-1]?.[j] == "S") {
                g[i][j] = "|"
                beamSpawns.add(coord(i,j))
            }
            if (g[i][j] == "^") {
                g[i][j-1] = g[i][j+1] = "|"
                beamSpawns.add(coord(i,j-1))
                beamSpawns.add(coord(i,j+1))
            }
        }
    }
    //console.log('beamStarts')
    //console.log(beamSpawns)
    for (let pos of beamSpawns) {
        let [i,j] = pos.split(",").map(s => Number(s))
        //console.log({i,j})

        let k = i
        while (k < g.length - 1 && g[k+1][j] != "^") {
            g[k+1][j] = "|"
            k++
        }
    }

    let splits = 0

    for (let i = 0; i < g.length; i++) {
        for (let j = 0; j < g[i].length; j++) {
            if (g[i][j] == "^" && g[i-1][j] == "|") splits++
        }
    }
    
    //console.log({splits})
    printMatrix(g)
    return splits
}