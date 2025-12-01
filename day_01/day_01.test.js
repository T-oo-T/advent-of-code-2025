const { test } = require("node:test")
const assert = require("assert").strict
const { part1, parseRotations } = require("./day_01")

test("parseRotations", () => {
    assert.deepStrictEqual(
        parseRotations(["L68", "R32"]),
        [-68, 32]
    )

    assert.deepStrictEqual(
        parseRotations(["R27", "L12"]),
        [27, -12]
    )
})

test("part 1, sample input 1", () => {
    assert.equal(
        part1("./input-sample.txt"),
        3
    )
})

test("part 1, sample input 2", () => {
    assert.equal(
        part1("./input-sample-2.txt"),
        4
    )
})

test("part 1, real input", () => {
    assert.equal(
        part1("./input1.txt"),
        1141
    )
})