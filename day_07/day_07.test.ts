// @ts-ignore
import test from "node:test"
// @ts-ignore
import assert from "node:assert/strict"
import { part1, part2 } from "./day_07.ts"

test("part1, sample input", () => {
    assert.deepStrictEqual(part1("input-sample.txt"), 21)
})

test("part1, real input", () => {
    assert.deepStrictEqual(part1("input-real.txt"), 1592)
})

test("part2, sample input", () => {
    assert.deepStrictEqual(part2("input-sample.txt"), 40)
})

test("part2, real input", () => {
    assert.deepStrictEqual(part2("input-real.txt"), 17921968177009)
})