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
    return a + b
}

function product(a, b) {
    return a * b
}

module.exports = {
    readFile,
    mod,
    quot,
    sum,
    product
}