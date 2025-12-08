// @ts-ignore
import test from "node:test"
// @ts-ignore
import assert from "node:assert/strict"
import { part1, part2, UnionFind } from "./day_08.ts"

test("part1, sample input", () => {
    assert.deepStrictEqual(part1("input-sample.txt"), 40)
})

test("UnionFind", () => {
    let unionFind = new UnionFind(6)
    
    assert.deepStrictEqual(unionFind.parents, [0,1,2,3,4,5])
    
    assert.equal(unionFind.find(0), 0)
    assert.equal(unionFind.find(1), 1)
    assert.equal(unionFind.find(2), 2)
    assert.equal(unionFind.find(3), 3)
    assert.equal(unionFind.find(4), 4)
    assert.equal(unionFind.componentCount(), 6)
    
    unionFind.union(0,2)
    assert.deepStrictEqual(unionFind.parents, [2,1,2,3,4,5])
    assert.equal(unionFind.componentCount(), 5)

    unionFind.union(1,3)
    assert.deepStrictEqual(unionFind.parents, [2,3,2,3,4,5])
    assert.equal(unionFind.componentCount(), 4)

    unionFind.union(2,1)
    assert.deepStrictEqual(unionFind.parents, [2,3,3,3,4,5])
    assert.equal(unionFind.componentCount(), 3)

    unionFind.union(5,4)
    assert.deepStrictEqual(unionFind.parents, [2,3,3,3,4,4])
    assert.equal(unionFind.componentCount(), 2)

    unionFind.union(0,5)
    assert.deepStrictEqual(unionFind.parents, [2,3,3,4,4,4])
    assert.equal(unionFind.componentCount(), 1)
})

test("part1, real input", () => {
    assert.deepStrictEqual(part1("input-real.txt"), 79560)
})

test("part2, sample input", () => {
    assert.deepStrictEqual(part2("input-sample.txt"), 25272)
})

test("part2, real input", () => {
    assert.deepStrictEqual(part2("input-real.txt"), 31182420)
})