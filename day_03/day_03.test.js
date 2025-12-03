const { test } = require("node:test")
const assert = require("assert").strict
const { sum, readFile } = require("../utils")


function maxJoltage(b) {
    let n = b.length
    let lmax = 0, lmaxi = -1, rmax = 0

    let l = 0, r = n-1

    while (l < n - 1) {
        if (parseInt(b[l],10) > lmax) {
            lmax = parseInt(b[l],10)
            lmaxi = l
        }
        l++
    }

    while (r > lmaxi) {
        rmax = Math.max(rmax, parseInt(b[r],10))
        r--
    }

    return Number(lmax.toString() + rmax.toString())
}

function banksTotalJoltage(banks) {
    return banks.map(maxJoltage).reduce(sum)
}

function part1(filePath) {
    let banks = readFile(filePath).split("\n").map(s => s.split(""))
    return banksTotalJoltage(banks)
}

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

function maxOverloadJoltage(b) {
    for (let i = 0; i < 6; i++) {
        console.log("running maxJoltage on b", maxJoltage(b))
    }
    return 987654321111
}

test("maxJoltage", () => {
    assert.equal(maxOverloadJoltage([
        '9', '8', '7', '6',
        '5', '4', '3', '2',
        '1', '1', '1', '1',
        '1', '1', '1'
      ]), 987654321111)
    /*assert.equal(maxOverloadJoltage([
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
      ]), 888911112111)*/
})

test("part 1, sample input", () => {
    assert.equal(part1("./input-sample.txt"), 357)
})

test("part 1, real input", () => {
    assert.equal(part1("./input-real.txt"), 17087)
})