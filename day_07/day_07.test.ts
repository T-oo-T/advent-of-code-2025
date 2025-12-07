// @ts-ignore
import test from "node:test"
// @ts-ignore
import assert from "node:assert/strict"
import { part1 } from "./day_07.ts"

test("part1, sample input", () => {
    assert.deepStrictEqual(part1("input-sample.txt"), 21)
})

test("part1, real input", () => {
    assert.deepStrictEqual(part1("input-real.txt"), 1592)
})