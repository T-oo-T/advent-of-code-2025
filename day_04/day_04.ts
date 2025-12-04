const { readFile, sum } = require("../utils")

type Grid = number[][]

function parseFile(filePath: string): Grid {
    return readFile(filePath)
        .split("\n")
        .map((row: string) => 
            row.split("")
                .map(char => char == "." ? 0 : 1)
        )
}

function accessibleRolls(grid: Grid): Grid {
    let rolls: number[][] = []

    let val = ([i, j]: number[]): number => grid[i]?.[j] || 0

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == 0) continue
            
            let adjacentCoords = [
                // previous row
                [i-1,j-1], [i-1,j], [i-1,j+1],
                // next row
                [i+1,j-1], [i+1,j], [i+1,j+1],
                // same row
                [i,j-1], [i,j+1]
            ]

            let adjacentRolls = adjacentCoords.map(coord => val(coord)).reduce(sum)

            if (adjacentRolls < 4) rolls.push([i,j])
        }
    }

    return rolls
}

function part1(filePath: string): number {
    let grid = parseFile(filePath)
    return accessibleRolls(grid).length
}

function part2(filePath: string): number {
    let grid = parseFile(filePath)
    let totalRollsRemoved = 0
    let rollsToRemove = accessibleRolls(grid)

    while (rollsToRemove.length > 0) {
        totalRollsRemoved += rollsToRemove.length

        for (let [i, j] of rollsToRemove) {
            grid[i][j] = 0
        }

        rollsToRemove = accessibleRolls(grid)
    }

    return totalRollsRemoved
}

module.exports = {
    parseFile,
    accessibleRolls,
    part1,
    part2
}