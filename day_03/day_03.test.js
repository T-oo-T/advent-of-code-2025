const { test } = require("node:test")
const assert = require("assert").strict
const { maxJoltage, maxOverloadJoltage, part1, part2 } = require("./day_03")

test("maxJoltage", () => {
    assert.equal(maxJoltage([
        '9', '8', '7', '6',
        '5', '4', '3', '2',
        '1', '1', '1', '1',
        '1', '1', '1'
      ]), 98)
    assert.equal(maxJoltage([
        '8', '1', '1', '1',
        '1', '1', '1', '1',
        '1', '1', '1', '1',
        '1', '1', '9'
      ]), 89)
    assert.equal(maxJoltage([
        '2', '3', '4', '2',
        '3', '4', '2', '3',
        '4', '2', '3', '4',
        '2', '7', '8'
      ]), 78)
    assert.equal(maxJoltage([
        '8', '1', '8', '1',
        '8', '1', '9', '1',
        '1', '1', '1', '2',
        '1', '1', '1'
      ]), 92)
})


test("maxOverloadJoltage", () => {
    assert.equal(maxOverloadJoltage([
        '9', '8', '7', '6',
        '5', '4', '3', '2',
        '1', '1', '1', '1',
        '1', '1', '1'
      ]), 987654321111)

    assert.equal(maxOverloadJoltage([
        '8', '1', '1', '1',
        '1', '1', '1', '1',
        '1', '1', '1', '1',
        '1', '1', '9'
      ]), 811111111119)
    assert.equal(maxOverloadJoltage([
        '2', '3', '4', '2',
        '3', '4', '2', '3',
        '4', '2', '3', '4',
        '2', '7', '8'
      ]), 434234234278)
    assert.equal(maxOverloadJoltage([
        '8', '1', '8', '1',
        '8', '1', '9', '1',
        '1', '1', '1', '2',
        '1', '1', '1'
      ]), 888911112111)
})

test("part 1, sample input", () => {
    assert.equal(part1("./input-sample.txt"), 357)
})

test("part 1, real input", () => {
    assert.equal(part1("./input-real.txt"), 17087)
})

test("part 2, sample input", () => {
    assert.equal(part2("./input-sample.txt"), 3121910778619)
})

test("part 2, real input", () => {
    assert.equal(part2("./input-real.txt"), 169019504359949)
})