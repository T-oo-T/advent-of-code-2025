const { test } = require("node:test")
const assert = require("assert").strict
const { parseFile, accessibleRolls, part1, part2 } = require("./day_04.ts")

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

test("parseFile", () => {
    assert.deepStrictEqual(parseFile("./input-sample.txt"), sampleInputData)
})

test("accessibleRolls", () => {
    assert.equal(accessibleRolls(sampleInputData).length, 13)
    assert.equal(accessibleRolls(sampleInputDataVariation).length, 17)
})

test("part 1, sample input", () => {
    assert.equal(part1("./input-empty.txt"), 0)
    assert.equal(part1("./input-sample.txt"), 13)
})

test("part 1, real input", () => {
    assert.equal(part1("./input-real.txt"), 1393)
})

test("part 2, sample input", () => {
    assert.equal(part2("./input-empty.txt"), 0)
    assert.equal(part2("./input-sample.txt"), 43)
})

test("part 2, real input", () => {
    assert.equal(part2("./input-real.txt"), 8643)
})