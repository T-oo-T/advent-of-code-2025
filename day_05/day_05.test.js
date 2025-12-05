// @ts-ignore
import { test } from "node:test"
// @ts-ignore
import assert from "assert/strict"
import { part1, part2, mergeRangeList, mergeRanges } from "./day_05.ts"

test("part1, sample input", () => {
    assert.equal(part1("input-sample.txt"), 3)
})

test("part2, sample input", () => {
    assert.equal(part2("input-sample.txt"), 14)
})

test("part1, real input", () => {
    assert.equal(part1("input-real.txt"), 635)
})

test("mergeRanges", () => {
    // a: 12 ----- 18
    // b:     16 ----- 20
    assert.deepEqual(mergeRanges([12,18], [16,20]), [12,20])
    // a: 12 --- 18
    // b:          20 ---- 22
    assert.deepEqual(mergeRanges([12,18], [20,22]), null)
    // a: 12 -------- 18
    // b:    16 -- 17
    assert.deepEqual(mergeRanges([12,18], [16,17]), [12,18])

    // a:     16 ----- 20
    // b: 12 ----- 18
    assert.deepEqual(mergeRanges([16,20], [12,18]), [12,20])
    // a: 12 --- 18
    // b:           20 ---- 22
    assert.deepEqual(mergeRanges([12,18], [20,22]), null)
    // a: 12 -------- 18
    // b:    16 -- 17
    assert.deepEqual(mergeRanges([12,18], [16,17]), [12,18])
})

test("mergeRangeList", () => {
    assert.deepEqual(
        mergeRangeList([[3,5], [10,14], [16,20], [12,18]]),
        [[3,5], [10,20]]
    )
    assert.deepEqual(
        mergeRangeList([[11,13], [10,14], [16,20], [12,18]]),
        [[10,20]]
    )
})

test("part2, real input", () => {
    assert.equal(part2("input-real.txt"), 369761800782619)
})