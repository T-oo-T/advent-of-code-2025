const { readFile, mod } = require("../utils")

function part1(filePath) {
    let rotations = parseRotations(readFile(filePath).split("\n"))
    let dialPosition = 50
    let zeroPositions = 0

    for (let i = 0; i < rotations.length; i++) {
        dialPosition += rotations[i]
        dialPosition = mod(dialPosition, 100)

        if (Math.abs(dialPosition) == 0) {
            zeroPositions++
        }
    }

    return zeroPositions
}

function part2(filePath) {
    let rotations = parseRotations(readFile(filePath).split("\n"))
    let dialPosition = 50
    let zeroPositions = 0

    for (let i = 0; i < rotations.length; i++) {
        for (let j = 0; j < Math.abs(rotations[i]); j++) {
            if (rotations[i] < 0) {
                dialPosition--
            } else {
                dialPosition++
            }
            dialPosition = mod(dialPosition, 100)
            if (dialPosition == 0) zeroPositions++
        }
    }

    return zeroPositions
}

function parseRotations(rotations) {
    return rotations.map(rotation => {
        let direction = rotation.charAt(0)
        let amount = parseInt(rotation.slice(1), 10)

        if (direction == "L") {
            return -amount
        } else {
            return amount
        }
    })
}

module.exports = {
    part1,
    part2,
    parseRotations
}