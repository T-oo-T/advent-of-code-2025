// @ts-ignore
import { test } from "node:test"
// @ts-ignore
import assert from "assert/strict"
import { readFile } from "../utils.js"

function part1(filePath: string): number {
    let data: string[][] = readFile(filePath)
        .split("\n\n")
        .map(s => s.split("\n"))

    if (data.length < 2) return 0

    let idRanges: number[][] = data[0].map(s => s.split("-").map(r => Number(r)))
    let availableIds: number[] = data[1].map(s => Number(s))
    //console.log({idRanges,availableIds})
    
    return availableIds
        .filter(id => 
            idRanges.some((range) => range[0] <= id && id <= range[1]))
        .length
}

test("part1, sample input", () => {
    assert.equal(part1("input-empty.txt"), 0)
    assert.equal(part1("input-sample.txt"), 3)
})

test("part1, real input", () => {
    assert.equal(part1("input-real.txt"), 635)
})