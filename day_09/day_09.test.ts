// @ts-ignore
import test from "node:test"
// @ts-ignore
import assert from "node:assert/strict"
import { part1, part2, intersect } from "./day_09.ts"

test("part 1, sample input", () => {
    assert.equal(part1("input-sample.txt"), 50)
})

test("part 1, real input", () => {
    assert.equal(part1("input-real.txt"), 4769758290)
})

test("part 2, sample input", () => {
    assert.equal(part2("input-sample.txt"), 24)
})

test("intersect", () => {
    assert.equal(intersect(
        {a: [2,4], b: [17,4]},
        {a: [13,2], b: [13,7]},
    ),true)
    assert.equal(intersect(
        {a: [2,4], b: [17,4]},
        {a: [13,7], b: [13,3]},
    ),true)

    assert.equal(intersect(
        {a: [17,4], b: [2,4]},
        {a: [13,2], b: [13,7]},
    ),true)
    assert.equal(intersect(
        {a: [17,4], b: [2,4]},
        {a: [13,7], b: [13,3]},
    ),true)

    // touches only endpoint
    assert.equal(intersect(
        {a: [2,4], b: [17,4]},
        {a: [7,4], b: [7,1]},
    ),false)
    assert.equal(intersect(
        {a: [2,4], b: [17,4]},
        {a: [7,1], b: [7,4]},
    ),false)

    assert.equal(intersect(
        {a: [2,4], b: [17,4]},
        {a: [18,2], b: [18,7]},
    ),false)
})

test.skip("part 2, real input", () => {
    assert.equal(part2("input-real.txt"), -1)
})