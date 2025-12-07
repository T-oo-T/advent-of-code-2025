import test from "node:test"
import assert from "node:assert/strict"
import { 
    parseFile, 
    calculateColumn,
    calculateWorksheet,
    part1,
    part2
} from "./day_06.ts"
import { transpose } from "../utils.js"

test("parseFile", () => {
    assert.deepStrictEqual(parseFile("./input-empty.txt"), {numbers: [], operations: ['']})
    assert.deepStrictEqual(
        parseFile("./input-sample.txt"),
        {
            numbers: [
                [123, 328, 51, 64],
                [45, 64, 387, 23],
                [6, 98, 215, 314]
            ],
            operations: ["*", "+", "*", "+"]
        }
    )
})

test("calculateColumn", () => {
    assert.deepStrictEqual(
        calculateColumn({
            numbers: [
                [100, 555],
                [200, 42],
                [300, 52]
            ],
            operations: ["+", "*"]
        }, 0), 
        600
    )
    assert.deepStrictEqual(
        calculateColumn({
            numbers: [
                [100, 555],
                [200, 42],
                [300, 52]
            ],
            operations: ["+", "*"]
        }, 1),
        1212120
    )
})

test("calculateWorksheet", () => {
    assert.deepStrictEqual(
        calculateWorksheet({
            numbers: [
                [100],
                [200],
                [300]
            ],
            operations: ["*"]
        }),
        [6000000]
    )
    assert.deepStrictEqual(
        calculateWorksheet({
            numbers: [
                [100],
                [200],
                [300]
            ],
            operations: ["+"]
        }),
        [600]
    )
    assert.deepStrictEqual(
        calculateWorksheet({
            numbers: [
                [100, 555],
                [200, 42],
                [300, 52]
            ],
            operations: ["+", "*"]
        }),
        [600,1212120]
    )
    assert.deepStrictEqual(
        calculateWorksheet({
            numbers: [
                [123, 328, 51, 64],
                [45, 64, 387, 23],
                [6, 98, 215, 314]
            ],
            operations: ["*", "+", "*", "+"]
        }),
        [33210, 490, 4243455, 401]
    )
})

test("part1, sample input", () => {
    assert.equal(part1("./input-sample.txt"), 4277556)
})

test("part1, real input", () => {
    assert.equal(part1("./input-real.txt"), 4771265398012)
})

test("transpose", () => {
    assert.deepStrictEqual(
        transpose([
            [1,2],
            [3,4],
            [5,6],
            [7,8]
        ]),
        [
            [1,3,5,7],
            [2,4,6,8]
        ]
    )
})

test("part2, single column input", () => {
    assert.equal(part2("./input-single-column.txt"), 8544)
})

test("part2, input variations", () => {
    assert.equal(part2("./input-variations.txt"), 377032)
})

test("part2, sample input", () => {
    assert.equal(part2("./input-sample.txt"), 3263827)
})

test("part2, real input", () => {
    assert.equal(part2("./input-real.txt"), 10695785245101)
})