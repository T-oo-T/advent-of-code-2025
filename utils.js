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

module.exports = {
    readFile,
    mod,
    quot,
    sum,
    product,
    transpose
}