import { readFile } from "../utils.js"

function dist([x1,y1,z1]: number[], [x2,y2,z2]: number[]): number {
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2) + Math.pow(z1-z2, 2))
}

type Edge = {
    from: number,
    to: number,
    weight: number
}

export class UnionFind {
    components: number[]

    constructor(n: number) {
        this.components = Array.from(new Array(n).keys())
    }

    find(i: number): number {
        return this.components[i]
    }

    union(a: number, b: number): undefined {
        let a_root = this.find(a)
        let b_root = this.find(b)

        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i] == a_root) {
                this.components[i] = b_root
            }
        }
    }

    componentCount(): number {
        return new Set(this.components).size
    }

    componentSizes(): number[] {
        let compSizes = new Array(this.components.length).fill(0)

        for (let i = 0; i < this.components.length; i++) {
            compSizes[this.find(i)]++
        }

        return compSizes
    }
}

export function part1(filePath: string): number {
    let junctionBoxes: number[][] = readFile(filePath)
        .split("\n")
        .map((row:string) => row.split(",").map((d:string) => Number(d)))
    
    let unionFind = new UnionFind(junctionBoxes.length)
    let connectionCount = filePath == "input-real.txt" ? 1000 : 10
    let edges: Edge[] = []

    for (let i = 0; i < junctionBoxes.length; i++) {
        for (let j = i + 1; j < junctionBoxes.length; j++) {
            edges.push({from: i, to: j, weight: dist(junctionBoxes[i],junctionBoxes[j])})
        }   
    }
    edges.sort((a,b) => a.weight - b.weight)
    
    for (let i = 0; i < connectionCount; i++) {
        let edge = edges[i]    
        unionFind.union(edge.from,edge.to)
    }
    
    let compSizes = unionFind.componentSizes()
    
    compSizes.sort((a,b) => b - a)
    
    let [c1,c2,c3] = compSizes
     
    return c1 * c2 * c3
}

export function part2(filePath: string) {

}