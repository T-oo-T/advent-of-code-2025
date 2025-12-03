const { sum, readFile } = require("../utils")

function maxJoltage(b) {
    let n = b.length
    let lmax = 0, lmaxi = -1, rmax = 0

    let l = 0, r = n-1

    while (l < n - 1) {
        if (parseInt(b[l],10) > lmax) {
            lmax = parseInt(b[l],10)
            lmaxi = l
        }
        l++
    }

    while (r > lmaxi) {
        rmax = Math.max(rmax, parseInt(b[r],10))
        r--
    }

    lmax *= 10

    return lmax + rmax
}

function banksTotalJoltage(banks, fn) {
    return banks.map(fn).reduce(sum)
}

function maxOverloadJoltage(b) {
    let n = b.length
    let res = 0
    let prevMaxIndex = -1
    
    for (let i = 12; i > 0; i--) {
        let maxv = 0, maxi = -1

        for (let j = prevMaxIndex + 1; j <= n - i; j++) {
            if (b[j] > maxv) {
                maxv = b[j]
                maxi = j
            }
        }
        
        prevMaxIndex = maxi
        res += maxv * Math.pow(10, i-1)
    }

    return res
}

function part1(filePath) {
    let banks = readFile(filePath).split("\n").map(s => s.split(""))
    return banksTotalJoltage(banks, maxJoltage)
}

function part2(filePath) {
    let banks = readFile(filePath).split("\n").map(s => s.split(""))
    return banksTotalJoltage(banks, maxOverloadJoltage)
}

module.exports = {
    maxJoltage,
    maxOverloadJoltage,
    part1,
    part2
}