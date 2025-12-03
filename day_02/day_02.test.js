const { test } = require("node:test")
const assert = require("assert").strict
const { part1, part2, sequenceOfRepeats } = require("./day_02")

test("part1, sample input", () => {
    assert.equal(part1("./input-sample.txt"), 1227775554)
})

test("part1, real input", () => {
    assert.equal(part1("./input-real.txt"), 44487518055)
})

test("sequenceOfRepeats", () => {
    assert.equal(sequenceOfRepeats(1), false)
    assert.equal(sequenceOfRepeats(12), false)
    assert.equal(sequenceOfRepeats(11), true)
    assert.equal(sequenceOfRepeats(22), true)
    assert.equal(sequenceOfRepeats(99), true)
    assert.equal(sequenceOfRepeats(111), true)
    assert.equal(sequenceOfRepeats(999), true)
    assert.equal(sequenceOfRepeats(1010), true)
    assert.equal(sequenceOfRepeats(113), false)
    assert.equal(sequenceOfRepeats(118118),true)
    assert.equal(sequenceOfRepeats(1188511885), true)
    assert.equal(sequenceOfRepeats(1111111), true)
    assert.equal(sequenceOfRepeats(12341234), true)
    assert.equal(sequenceOfRepeats(123123123), true)
    assert.equal(sequenceOfRepeats(1212121212), true)
    assert.equal(sequenceOfRepeats(12345), false)
    assert.equal(sequenceOfRepeats(12312355),false)
    assert.equal(sequenceOfRepeats(222222),true)
    assert.equal(sequenceOfRepeats(446446),true)
    assert.equal(sequenceOfRepeats(38593859),true)
    assert.equal(sequenceOfRepeats(655655),true)
    assert.equal(sequenceOfRepeats(9957599575),true)
    assert.equal(sequenceOfRepeats(101), false)
    assert.equal(sequenceOfRepeats(1001), false)
    assert.equal(sequenceOfRepeats(1011), false)
    assert.equal(sequenceOfRepeats(1188511881), false)
    assert.equal(sequenceOfRepeats(446444), false)
    assert.equal(sequenceOfRepeats(565655), false)
    assert.equal(sequenceOfRepeats(2121212122), false)    
    assert.equal(sequenceOfRepeats(3202320), false)
    assert.equal(sequenceOfRepeats(3273273),false)
})

test("part2, sample input", () => {
    assert.equal(part2("./input-sample.txt"), 4174379265)
})


test("part2, real input", () => {
    assert.equal(part2("./input-real.txt"), 53481866137)
})