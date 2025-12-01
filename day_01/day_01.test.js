const { test } = require("node:test")
const assert = require("assert").strict
const { part1 } = require("./day_01")

test("part 1, sample input", () => {
    assert.equal(
        part1("./input-sample.txt"),
        3
    )
})

test.skip("part 1, sample input", () => {
    assert.equal(
        part1("./input-sample-2.txt"),
        4
    )
})