const { readFile, sum } = require("../utils")

function parseFile(filePath) {
    return readFile(filePath)
        .split("\n")
        .map(row => 
            row.split("")
                .map(char => char == "." ? 0 : 1)
        )
}

function accessibleRolls(grid) {
    let rolls = []

    let val = ([i, j]) => grid[i]?.[j] || 0

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

            let adjacentRolls = adjacentCoords.map(val).reduce(sum)

            if (adjacentRolls < 4) rolls.push([i,j])
        }
    }

    return rolls
}

function part1(filePath) {
    let grid = parseFile(filePath)
    return accessibleRolls(grid).length
}

function part2(filePath) {
    let grid = parseFile(filePath)
    let totalRollsRemoved = 0
    
    for (let rollsToRemove = accessibleRolls(grid); 
         rollsToRemove.length > 0; 
         rollsToRemove = accessibleRolls(grid)) {
        totalRollsRemoved += rollsToRemove.length

        for (let [i, j] of rollsToRemove) {
            grid[i][j] = 0
        }
    }

    return totalRollsRemoved
}

module.exports = {
    parseFile,
    accessibleRolls,
    part1,
    part2
}