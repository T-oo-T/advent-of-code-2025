import { test } from "node:test"
import assert from "node:assert/strict"
import { readFile, sum } from "../utils.js"

type Worksheet = {
    numbers: number[][],
    operations: Operation[]
}

type Operation = '*' | '+'

function parseFile(filePath: string): Worksheet {
    let data = readFile(filePath)
        .split("\n")
        .map((row:string) => row.trim())
        .map((row:string) => row.split(/\s+/))
    let operations = data[data.length - 1] as Operation[]
    let numbers = data
        .slice(0, data.length - 1)
        .map((row:string[]) => row.map((r:string) => Number(r)))

    return {
        numbers,
        operations
    }
}

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

function calculateColumn(workSheet: Worksheet, columnIndex: number): number {
    let operation = workSheet.operations[columnIndex]
    let total = operation == '*' ? 1 : 0

    for (let row = 0; row < workSheet.numbers.length; row++) {
        let value = workSheet.numbers[row][columnIndex]
        total = (operation == '*') ? total * value : total + value
    }

    return total
}

function calculateWorksheet(workSheet: Worksheet): number[] {
    let result: number[] = []
    for (let col = 0; col < workSheet.numbers[0].length; col++) {
        result.push(calculateColumn(workSheet, col))
    }
    return result
}

function part1(filePath: string): number {
    return calculateWorksheet(parseFile(filePath)).reduce(sum)
}

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