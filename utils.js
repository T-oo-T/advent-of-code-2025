const fs = require("node:fs")

function readFile(filePath) {
    return fs.readFileSync(filePath, "utf-8")
}

function mod(a, b) {
    return (b + a % b) % b
}

function quot(a, b) {
    return Math.abs(Math.floor(a / b))
}

function sum(a, b) {
    if (Array.isArray(a)) return a.reduce(sum, 0)
        return a + b
}

function product(a, b) {
    if (Array.isArray(a)) return a.reduce(product, 1)
        return a * b
}

function transpose(A) {
    let T = Array.from(new Array(A[0].length), () => new Array(A.length).fill(0))
    for (let i = 0; i < T.length; i++) {
        for (let j = 0; j < T[i].length; j++) {
            T[i][j] = A[j][i]
        }
    }
    return T
}

function dot(u, v) {
    if (u.length !== v.length) {
        throw new Error(`Incompatible vector sizes: ${u.length} and ${v.length}`)
    }
    
    let sum = 0
    for (let i = 0; i < u.length; i++) {
        sum += u[i] * v[i]
    }
    
    return sum
}

function matrix(i,j) {
    return Array.from(new Array(i), () => new Array(j).fill(0))
}

function matmul(A, B) {
    if (A[0].length !== B.length) {
        throw new Error(`Incompatible matrix sizes: [${A.length}][${A[0].length}] and [${B.length}][${B[0].length}]`)
    }
    
    let output = matrix(A.length, B[0].length)
    const BT = transpose(B)
    
    for (let i = 0; i < output.length; i++) {
        for (let j = 0; j < output[i].length; j++) {
            output[i][j] = dot(A[i], BT[j])
        }
    }
    
    return output
}

function printMatrix(g) {
    let out = ""
    for (let i = 0; i < g.length; i++) {
        for (let j = 0; j < g[i].length; j++) {
            out += g[i][j]
        }
        console.log(out)
        out=""
    }
    console.log("\n")
}

module.exports = {
    readFile,
    mod,
    quot,
    sum,
    product,
    transpose,
    printMatrix,
    matmul
}