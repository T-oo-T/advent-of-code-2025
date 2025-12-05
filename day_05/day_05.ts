import { readFile } from "../utils.js"

type Range = number[]

function parseFile(filePath: string): string[][] {
    return readFile(filePath)
        .split("\n\n")
        .map((s: string) => s.split("\n"))
}

export function part1(filePath: string): number {
    let data = parseFile(filePath)
    let idRanges: Range[] = data[0].map(s => s.split("-").map(r => Number(r)))
    let availableIds: number[] = data[1].map(s => Number(s))
    
    return availableIds
        .filter(id => 
            idRanges.some((range) => range[0] <= id && id <= range[1]))
        .length
}

export function part2(filePath: string): number {
    let data = parseFile(filePath)    
    let idRanges: Range[] = data[0].map(s => s.split("-").map(r => Number(r)))
    let mergedRanges = mergeRangeList(idRanges)
    let totalValidIds = 0

    for (let [start,end] of mergedRanges) {
        totalValidIds += end-start + 1
    }

    return totalValidIds
}

export function mergeRanges(a: Range, b: Range): Range | null {
    if (b[0] < a[0]) return mergeRanges(b, a)
    if (a[0] <= b[0] && b[0] <= a[1] && a[1] <= b[1]) {
        return [a[0], b[1]]
    }

    if (a[0] <= b[0] && b[1] <= a[1]) {
        return [a[0], a[1]]
    }

    return null
}

export function mergeRangeList(rangeList: Range[]): Range[] {
    let rangeListSorted = rangeList.sort((a, b) => a[0] - b[0])

    for (let i = 0; i < rangeListSorted.length - 1; i++) {
        let mergedRange = mergeRanges(rangeListSorted[i], rangeListSorted[i+1])
        if (!mergedRange) continue
        rangeListSorted[i] = [-1,-1]
        rangeListSorted[i+1] = mergedRange
    }

    return rangeListSorted.filter(range => range[0] != -1)
}