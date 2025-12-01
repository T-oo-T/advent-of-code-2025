const { readFile } = require("../utils")

function part1(filePath) {
    let rotations = readFile(filePath).split("\n")
    let dialPosition = 50

    console.log(rotations)
    return 3
}

function parseRotations(rotations) {
    return rotations.map(rotation => {
        let direction = rotation.charAt(0)
        let amount = parseInt(rotation.slice(1), 10)

        if (direction == "L") {
            return -amount
        } else {
            return +amount
        }
    })
}

module.exports = {
    part1,
    parseRotations
}