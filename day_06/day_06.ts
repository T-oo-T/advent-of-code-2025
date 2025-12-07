import { readFile, sum, product } from "../utils.js"

type Worksheet = {
    numbers: number[][],
    operations: Operation[]
}

type Operation = '*' | '+'

export function parseFile(filePath: string): Worksheet {
    let data = readFile(filePath)
        .split("\n")
        .map((row:string) => row.trim())
        .map((row:string) => row.split(/\s+/))
    let operations = data[data.length - 1] as Operation[]
    let numbers = data
        .slice(0, data.length - 1)
        .map((row:string[]) => row.map((r:string) => Number(r)))

    return {
        numbers,
        operations
    }
}

export function calculateColumn(workSheet: Worksheet, columnIndex: number): number {
    let operation = workSheet.operations[columnIndex]
    let total = operation == '*' ? 1 : 0

    for (let row = 0; row < workSheet.numbers.length; row++) {
        let value = workSheet.numbers[row][columnIndex]
        total = (operation == '*') ? total * value : total + value
    }

    return total
}

export function calculateWorksheet(workSheet: Worksheet): number[] {
    let result: number[] = []
    for (let col = 0; col < workSheet.numbers[0].length; col++) {
        result.push(calculateColumn(workSheet, col))
    }
    return result
}

export function part1(filePath: string): number {
    return calculateWorksheet(parseFile(filePath)).reduce(sum)
}

export function transpose(A: number[][]) {
    let T = Array.from(new Array(A[0].length), () => new Array(A.length).fill(0))
    for (let i = 0; i < T.length; i++) {
        for (let j = 0; j < T[i].length; j++) {
            T[i][j] = A[j][i]
        }
    }
    return T
}

export function part2(filePath: string) {
    let data = readFile(filePath).split("\n")
    let operationsRow = data[data.length-1]
    let s = 0, e = 0
    let res: number[][][] = []
    
    for (let i = 0; i < operationsRow.length-1; i++) {
        let nextChar = operationsRow[i+1]
        if (nextChar == '+' || nextChar == '*') {
            e = i
            res.push([])
            for (let j = 0; j < data.length - 1; j++) {
                res[res.length-1].push(data[j].substring(s, e).split("").map(s => Number(s)))
            }
            s = e+1
        }
    }

    res.push([])
    for (let j = 0; j < data.length - 1; j++) {
        res[res.length-1].push(data[j].substring(s, data[j].length+1).split("").map(s => Number(s)))
    }
    
    res = res.map(transpose)
    
    let operations = operationsRow.split(/\s+/).map(s => s.trim()).filter(s => s)
    let total: number = 0

    for (let i = 0; i < res.length; i++) {
        let operation = operations[i]
        let colNums: number[] = []
        for (let j = 0; j < res[i].length; j++) {
            let num = 0
            for (let k = 0; k < res[i][j].length; k++) {
                let digit = res[i][j][k]
    
                if (digit == 0) {
                    num /= 10
                } else {
                    num += digit * Math.pow(10, res[i][j].length - k - 1)
                }
            }

            colNums.push(num)
        }
        
        if (operation == '*') {
            total += product(colNums)
        } else {
            total += sum(colNums)
        }
    }

    return total   
}