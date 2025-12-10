// @ts-ignore
import test from "node:test"
// @ts-ignore
import assert from "node:assert/strict"
import { part1 } from "./day_10.ts"

test("part 1, sample input", () => {
    assert.equal(part1("input-sample.txt"), 7)
})

test("part 1, real input", () => {
    assert.equal(part1("input-real.txt"), 550)
})