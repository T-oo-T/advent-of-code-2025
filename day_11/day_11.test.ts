// @ts-ignore
import { test } from "node:test"
// @ts-ignore
import assert from "node:assert/strict"
import { part1, part2, paths } from "./day_11.ts"

test("getPaths", () => {
    let graph = {
        "aaa": ["you", "hhh"],
        "you": ["bbb", "ccc"],
        "bbb": ["ddd", "eee"],
        "ccc": ["ddd", "eee", "fff"],
        "ddd": ["ggg"],
        "eee": ["out"],
        "fff": ["out"],
        "ggg": ["out"],
        "hhh": ["ccc", "fff", "iii"],
        "iii": ["out"],
        "out": [] // Needs to be added separately when parsing input data
    }
    
    assert.deepStrictEqual(
        paths(graph, "out", "you"),
        0
    )
    
    assert.deepStrictEqual(
        paths(graph, "you", "out"),
        5
    )
    
    assert.deepStrictEqual(
        paths(graph, "bbb", "out"),
        2
    )
})

test("part 1, sample input", () => {
    assert.equal(part1("input-sample.txt"), 5)
})

test("part 1, real input", () => {
    assert.equal(part1("input-real.txt"), 599)
})

test.skip("part 2, sample input", () => {
    assert.equal(part2("input-sample-part-2.txt"), 2)
})

test.skip("part 2, real input", () => {
    assert.equal(part2("input-real.txt"), -1)
})