// @ts-ignore
import { test } from "node:test"
// @ts-ignore
import assert from "assert/strict"
import { readFile } from "../utils.js"

type Range = number[]

function part1(filePath: string): number {
    let data: string[][] = readFile(filePath)
        .split("\n\n")
        .map(s => s.split("\n"))

    if (data.length < 2) return 0

    let idRanges: Range[] = data[0].map(s => s.split("-").map(r => Number(r)))
    let availableIds: number[] = data[1].map(s => Number(s))
    
    return availableIds
        .filter(id => 
            idRanges.some((range) => range[0] <= id && id <= range[1]))
        .length
}

function part2(filePath: string): number {
    let data: string[][] = readFile(filePath)
        .split("\n\n")
        .map((s:string) => s.split("\n"))

    if (data.length < 2) return 0
    
    let idRanges: Range[] = data[0].map(s => s.split("-").map(r => Number(r)))
    let mergedRanges = mergeRangeList(idRanges)
    let totalValidIds = 0

    for (let [start,end] of mergedRanges) {
        totalValidIds += end-start + 1
    }

    return totalValidIds
}

test("part1, sample input", () => {
    assert.equal(part1("input-empty.txt"), 0)
    assert.equal(part1("input-sample.txt"), 3)
})

test("part2, sample input", () => {
    assert.equal(part2("input-empty.txt"), 0)
    // getting 12 with new implementation
    assert.equal(part2("input-sample.txt"), 14)
})

test("part1, real input", () => {
    assert.equal(part1("input-real.txt"), 635)
})

function mergeRanges(a: Range, b: Range): Range | null {
    if (b[0] < a[0]) return mergeRanges(b, a)
    if (a[0] <= b[0] && b[0] <= a[1] && a[1] <= b[1]) {
        return [a[0], b[1]]
    }

    if (a[0] <= b[0] && b[1] <= a[1]) {
        return [a[0], a[1]]
    }

    return null
}

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

function mergeRangeList(rangeList: Range[]): Range[] {
    let rangeListSorted = rangeList.sort((a, b) => a[0] - b[0])

    for (let i = 0; i < rangeListSorted.length - 1; i++) {
        let mergedRange = mergeRanges(rangeListSorted[i], rangeListSorted[i+1])
        if (!mergedRange) continue
        rangeListSorted[i] = [-1,-1]
        rangeListSorted[i+1] = mergedRange
    }

    return rangeListSorted.filter(range => range[0] != -1)
}

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