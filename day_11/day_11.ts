import { readFile, sum } from "../utils.js"

type Graph = {
    [key: string]: string[]
}

export function part1(filePath: string): number {
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

export function paths(graph: Graph, from: string, to: string): number {
    if (from == to) {
        return 1
    }

    return sum(graph[from].map(node => paths(graph, node, to)))
}

export function part2(filePath: string) {
    return 0
}
