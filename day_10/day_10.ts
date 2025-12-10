import { readFile } from "../utils.js"

export function part1(filePath: string): number {
    let data = readFile(filePath).split("\n")
        .map((row:string) => row.split(" "))
        .map((arr: string[]) => arr.slice(0,arr.length-1))
    
    let sum = 0
    for (let row of data) {
        let [lights, ...buttons] = row
        let lightsCount = lights.length - 2
        let lightsBinary = parseInt(lights.substring(1, lights.length-1).split("").map((c:string) => c=="#" ? 1 : 0).join(""),2)
        
        let buttonsBinary = buttons.map((buttonString: string) => {
            let trim = new Set(buttonString.substring(1,buttonString.length-1).split(",").map(s => Number(s)))
            let bstring = ""
            for (let i = 0; i < lightsCount; i++) {
                if (trim.has(i)) {
                    bstring += "1"
                } else {
                    bstring += "0"
                }
            }
    
            return parseInt(bstring, 2)
        })
    
        
        let subs: number[][] = [[]];

        for (let i = 0; i < buttonsBinary.length; i++) {
          let len = subs.length
          for (let j = 0; j < len; j++) {
            subs.push([...subs[j], buttonsBinary[i]])
          }
        }    

        subs.sort((a, b) => a.length - b.length)
    
        for (let presses of subs) {
            let res = presses.reduce((acc, press) => 
                acc ^= press
            , 0b0)
            if (res == lightsBinary) {
                sum += presses.length
                break
            }
        }
    }

    return sum
}