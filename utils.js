const fs = require("node:fs")

function readFile(filePath) {
    return fs.readFileSync(filePath, "utf-8")
}

function mod(a, b) {
    return (b + a % b) % b
}

function quot(a, b) {
    return Math.floor(a / b)
}

module.exports = {
    readFile,
    mod,
    quot
}