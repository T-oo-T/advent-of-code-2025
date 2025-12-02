const { readFile } = require("../utils")

function part1(filePath) {
    let ranges = readFile(filePath).split(",")
    let sum = 0
    
    for (let i = 0; i < ranges.length; i++) {
        let [start, end] = ranges[i].split("-").map(s => parseInt(s, 10))
        for (let j = start; j <= end; j++) {
            let jStr = j.toString()
            if (jStr.length % 2 == 0 && jStr.substring(0, jStr.length / 2) == jStr.substring(jStr.length / 2)) {
                sum += parseInt(jStr, 10)
            }
        }
    }

    return sum
}

module.exports = {
    part1
}
