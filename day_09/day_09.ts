import { readFile } from "../utils.js"

type Point = number[]

function square(leftPoint: Point, rightPoint: Point): number {
    return (Math.abs(leftPoint[0] - rightPoint[0]) + 1) * (Math.abs(leftPoint[1] - rightPoint[1]) + 1)
}

export function part1(filePath: string): number {
    let g = readFile(filePath)
        .split("\n")
        .map((row:string) => 
            row.split(",").map((s: string) => Number(s))
        )

    let maxSquare = 0

    for (let i = 0; i < g.length; i++) {
        for (let j = i + 1; j < g.length; j++) {
            maxSquare = Math.max(maxSquare, square(g[i], g[j]))
        }
    }

    return maxSquare
}