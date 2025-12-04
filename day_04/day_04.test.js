const { test } = require("node:test")
const assert = require("assert").strict
const { readFile, sum } = require("../utils")

function parseFile(filePath) {
    return readFile(filePath)
        .split("\n")
        .map(row => 
            row.split("")
                .map(char => char == "." ? 0 : 1)
        )
}

const sampleInputData = [
    [0,0,1,1,0,1,1,1,1,0],
    [1,1,1,0,1,0,1,0,1,1],
    [1,1,1,1,1,0,1,0,1,1],
    [1,0,1,1,1,1,0,0,1,0],
    [1,1,0,1,1,1,1,0,1,1],
    [0,1,1,1,1,1,1,1,0,1],
    [0,1,0,1,0,1,0,1,1,1],
    [1,0,1,1,1,0,1,1,1,1],
    [0,1,1,1,1,1,1,1,1,0],
    [1,0,1,0,1,1,1,0,1,0]
]


const sampleInputDataVariation = [
    [0,0,1,1,0,1,1,1,1,0],
    [1,1,1,0,1,0,1,0,0,1],
    [1,1,1,1,1,0,1,0,1,1],
    [1,0,1,1,1,1,0,0,1,0],
    [1,1,0,1,1,1,1,0,1,1],
    [0,1,1,1,1,1,1,1,0,1],
    [0,1,0,1,0,1,0,1,1,1],
    [1,0,1,1,1,0,1,1,1,1],
    [0,1,1,1,1,1,1,1,1,0],
    [1,0,1,0,1,1,1,0,1,0]
]

function accessibleRolls(grid) {
    let count = 0

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

            if (adjacentRolls < 4) count++
        }
    }

    return count
}

function part1(filePath) {
    let grid = parseFile(filePath)
    return accessibleRolls(grid)
}

test("parseFile", () => {
    assert.deepStrictEqual(parseFile("./input-sample.txt"), sampleInputData)
})

test("accessibleRolls", () => {
    assert.deepStrictEqual(accessibleRolls(sampleInputData), 13)
    assert.deepStrictEqual(accessibleRolls(sampleInputDataVariation), 17)
})

test("part 1, sample input", () => {
    assert.deepStrictEqual(part1("./input-sample.txt"), 13)
})

test("part 1, real input", () => {
    assert.deepStrictEqual(part1("./input-real.txt"), 1393)
})