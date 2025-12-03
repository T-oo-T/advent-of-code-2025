const { readFile } = require("../utils")

function part1(filePath) {
    let ranges = readFile(filePath).split(",")
    let sum = 0
    
    for (let i = 0; i < ranges.length; i++) {
        let [start, end] = ranges[i].split("-").map(s => parseInt(s, 10))
        for (let j = start; j <= end; j++) {
            let t = j.toString()
            if (t.length % 2 == 0 && t.substring(0, t.length / 2) == t.substring(t.length / 2)) {
                sum +=j 
            }
        }
    }

    return sum
}

function part2(filePath) {
    let ranges = readFile(filePath).split(",")
    let sum = 0
    
    for (let i = 0; i < ranges.length; i++) {
        let [start, end] = ranges[i].split("-").map(s => parseInt(s, 10))
        for (let j = start; j <= end; j++) {
            if (sequenceOfRepeats(j)) {
                sum+=j
            }
        }
    }

    return sum
}

function sequenceOfRepeats(number) {
    let t = number.toString()
    let n = t.length

    for (let k = 2; k <= n; k++) {
        if (n % k == 0) {
            let partSize = n/k
            let allPartsEqual = true
            let getSub = i => t.substring(i*partSize, i*partSize+partSize)

            for (let i = 0; i < k - 1; i++) {
                if (getSub(i) != getSub(i+1)) {
                    allPartsEqual = false
                }
            }

            if (allPartsEqual) return true
        }
    }

    return false
}

module.exports = {
    part1,
    part2,
    sequenceOfRepeats
}
