// @ts-ignore
import { describe, test } from "node:test"
// @ts-ignore
import assert from "node:assert/strict"
import { readFile, transpose, matmul, sum } from "../utils.js"

function part1(filePath: string): number {
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

function parseInput(filePath: string): {polyominos: Polyomino[], regions: Region[]} {
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

type GridCell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 
type Grid = GridCell[][]

function getGrid(width: number, height: number): Grid {
    let grid: Grid = []
    
    for (let i = 0; i < height; i++) {
        grid[i] = []
        for (let j = 0; j < width; j++) {
            grid[i][j] = 0
        }
    }
    
    return grid
}

type Region = {
    width: number,
    height: number,
    polyominoCounts: number[]
}

type PolyominoCell = 0 | 1
type Polyomino = PolyominoCell[][]

function getFreeArea(grid: Grid): number {
    let a = 0

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == 0) a++
        }
    }

    return a
}

const SWAP_ROWS_3x3 = [
    [0,0,1],
    [0,1,0],
    [1,0,0]
]

function flipHorizontal(polyomino: Polyomino): Polyomino {
    return matmul(polyomino, SWAP_ROWS_3x3)
}

function flipVertical(polyomino: Polyomino): Polyomino {
    return matmul(SWAP_ROWS_3x3, polyomino)
}

function rotate90(polyomino: Polyomino): Polyomino {   
    return flipHorizontal(transpose(polyomino))
}

describe("flipHorizontal", () => {
    test("polyomino 1", () => {
        assert.deepStrictEqual(
            flipHorizontal([
                [1,1,1],
                [1,1,0],
                [1,1,0]
            ]),
            [
                [1,1,1],
                [0,1,1],
                [0,1,1]
            ]
        )
    })
    
    test("polyomino 2", () => {
        assert.deepStrictEqual(
            flipHorizontal([
                [1,1,1],
                [1,1,0],
                [0,1,1]
            ]),
            [
                [1,1,1],
                [0,1,1],
                [1,1,0]
            ]
        )
    })
})

describe("flipVertical", () => {
    test("polyomino 1", () => {
        assert.deepStrictEqual(
            flipVertical([
                [1,1,1],
                [1,1,0],
                [1,1,0]
            ]),
            [
                [1,1,0],
                [1,1,0],
                [1,1,1]
            ]
        )
    })
    
    test("polyomino 2", () => {
        assert.deepStrictEqual(
            flipVertical([
                [1,1,1],
                [1,1,0],
                [0,1,1]
            ]),
            [
                [0,1,1],
                [1,1,0],
                [1,1,1]
            ]
        )
    })
})

describe("rotate90", () => {
    test("polyomino 1", () => {
        assert.deepStrictEqual(
            rotate90([
                [1,1,1],
                [1,1,0],
                [1,1,0]
            ]),
            [
                [1,1,1],
                [1,1,1],
                [0,0,1]
            ]
        )
    })

    test("polyomino 2", () => {
        assert.deepStrictEqual(
            rotate90([
                [1,1,1],
                [1,1,0],
                [0,1,1]
            ]),
            [
                [0,1,1],
                [1,1,1],
                [1,0,1]
            ]
        )
    })
})

describe("getFreeArea", () => {
    test("empty 4x4 grid", () => {
        assert.equal(getFreeArea(getGrid(4,4)), 16)
    })

    test("empty 5x12 grid", () => {
        assert.equal(getFreeArea(getGrid(5,12)), 60)
    })

    test("4x4 grid with polyomino", () => {
        assert.equal(getFreeArea([
            [0,0,0,0],
            [1,1,1,0],
            [1,0,0,0],
            [1,1,1,0]
        ]), 9)
    })
})

describe("getGrid", () => {
    test("0,0", () => {
        assert.deepStrictEqual(
            getGrid(0,0),
            []
        )
    })
    test("4,4", () => {
        assert.deepStrictEqual(
            getGrid(4,4),
            [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
            ]
        )
    })
    test("12x5", () => {
        assert.deepStrictEqual(
            getGrid(12,5),
            [
                [0,0,0,0,0, 0,0,0,0,0, 0,0],
                [0,0,0,0,0, 0,0,0,0,0, 0,0],
                [0,0,0,0,0, 0,0,0,0,0, 0,0],
                [0,0,0,0,0, 0,0,0,0,0, 0,0],
                [0,0,0,0,0, 0,0,0,0,0, 0,0],
            ]
        )
    })
})

test("parseInput, sample input", () => {
    assert.deepStrictEqual(
        parseInput("input-sample.txt"),
        {
            polyominos: [
                [
                    [1,1,1],
                    [1,1,0],
                    [1,1,0]
                ],
                [
                    [1,1,1],
                    [1,1,0],
                    [0,1,1]
                ],
                [
                    [0,1,1],
                    [1,1,1],
                    [1,1,0]
                ],
                [
                    [1,1,0],
                    [1,1,1],
                    [1,1,0]
                ],
                [
                    [1,1,1],
                    [1,0,0],
                    [1,1,1]
                ],
                [
                    [1,1,1],
                    [0,1,0],
                    [1,1,1]
                ]
            ],
            regions: [
                {width: 4, height: 4, polyominoCounts: [0, 0, 0, 0, 2, 0]},
                {width: 12, height: 5, polyominoCounts: [1, 0, 1, 0, 2, 2]},
                {width: 12, height: 5, polyominoCounts: [1, 0, 1, 0, 3, 2]}
            ]
        }
    )
})

test("parseInput, sample input variation", () => {
    assert.deepStrictEqual(
        parseInput("input-sample-variation.txt"),
        {
            polyominos: [
                [
                    [1,1,1],
                    [1,1,0],
                    [1,1,0]
                ],
                [
                    [0,1,1],
                    [1,1,1],
                    [1,1,0]
                ],
                [
                    [1,1,0],
                    [1,1,1],
                    [1,1,0]
                ],
                [
                    [1,1,1],
                    [1,0,0],
                    [1,1,1]
                ],
                [
                    [1,1,1],
                    [0,1,0],
                    [1,1,1]
                ]
            ],
            regions: [
                {width: 12, height: 5, polyominoCounts: [1, 1, 0, 2, 2]},
                {width: 12, height: 5, polyominoCounts: [1, 1, 0, 3, 2]}
            ]
        }
    )
})

test("part1, real input", () => {
    assert.equal(part1("input-real.txt"), 541)
})