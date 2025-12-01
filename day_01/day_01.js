const { readFile } = require("../utils")

function part1(filePath) {
    let rotations = readFile(filePath).split("\n")
    let dialPosition = 50

    console.log(rotations)
    return 3
}

module.exports = {
    part1
}