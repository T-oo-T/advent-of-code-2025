const { test } = require("node:test")
const assert = require("assert").strict
const { part1  } = require("./day_02")

test("part1, sample input", () => {
    assert.equal(part1("./input-sample.txt"), 1227775554)
})

test("part1, real input", () => {
    assert.equal(part1("./input-real.txt"), 44487518055)
})