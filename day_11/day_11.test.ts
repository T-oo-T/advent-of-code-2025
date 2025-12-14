// @ts-ignore
import { test } from "node:test"
// @ts-ignore
import assert from "node:assert/strict"
import { readFile, sum } from "../utils.js"


type Graph = {
    [key: string]: string[]
}


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

function part1(filePath: string): number {
    let data = readFile(filePath)
        .split("\n")
        .map((row:string) => row.split(": "))
    
    let graph = {}
    
    for (let [from, toString] of data) {
        graph[from] = toString.split(" ")
    }
    
    graph["out"] = []
    
    return paths(graph, "you", "out")
}

function paths(graph: Graph, from: string, to: string): number {
    if (from == to) {
        return 1
    }

    return sum(graph[from].map(node => paths(graph, node, to)))
}

function part2(filePath: string) {
    return 0
}


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