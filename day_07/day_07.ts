// globals: global
import { readFile } from "../utils.js"

let coord = (i: number, j: number): string => `${i},${j}`

export function part1(filePath: string) {
    let g = readFile(filePath).split("\n").map((row:string) => row.split(""))
    let beamSpawns: Set<string> = new Set()
    
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
    
    for (let pos of beamSpawns) {
        let [i,j] = pos.split(",").map(s => Number(s))
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
    
    return splits
}

export function part2(filePath: string): number {
    let g: string[][] = readFile(filePath).split("\n").map((row:string) => row.split(""))

    for (let j = 0; j < g[g.length-1].length; j++) {
        g[g.length-1][j] = "1"
    }

    let startColumn = -1
    for (let j = 0; j < g[0].length; j++) {
        if (g[0][j] == "S") {
            startColumn = j
            break
        }
    }

    for (let i = g.length - 2; i >= 0; i--) {
        let sumRowUnder = (left:number, right:number): string => 
            (Number(g[i+1][left]) + Number(g[i+1][right])).toString()    

        for (let j = 0; j < g[i].length; j++) {
            if (g[i][j] == ".") {
                if (g[i+1][j] == "^") {
                    g[i][j] = sumRowUnder(j-1,j+1)
                } else {
                    g[i][j] = g[i+1][j]
                }
            }
        }
    }

    return Number(g[1][startColumn])
}