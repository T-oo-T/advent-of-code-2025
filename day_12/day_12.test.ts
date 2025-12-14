// @ts-ignore
import { test } from "node:test"
// @ts-ignore
import assert from "node:assert/strict"
import { parseInput, part1 } from "./day_12.ts"

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