var fs = require("fs");

var writtenNumbers = new Map();

writtenNumbers.set(new RegExp("^one"), "1")
writtenNumbers.set(new RegExp("^two"), "2")
writtenNumbers.set( RegExp("^three"), "3")
writtenNumbers.set(new RegExp("^four"), "4")
writtenNumbers.set(new RegExp("^five"), "5")
writtenNumbers.set(new RegExp("^six"), "6")
writtenNumbers.set(new RegExp("^seven"), "7")
writtenNumbers.set(new RegExp("^eight"), "8")
writtenNumbers.set(new RegExp("^nine"), "9")

const isInt = (value) => {
    return !isNaN(value)
}

const startsANumber = (string, position) => {
    const section = string.substring(position)
    for(const [key, value] of writtenNumbers){
        if(key.test(section)){
            return value;
        }
    }
    return null;
}

const parseInputString = (string) => {
    const numbers = [];
    const arr = string.split("")
    for (let i = 0; i < string.length; i++) {
        if(isInt(arr[i])){
            numbers.push(arr[i])
        }
        const startsANumberValue = startsANumber(string, i)
        if(startsANumberValue !== null){
            numbers.push(startsANumberValue)
        }
    }
    const final = numbers[0] + numbers[numbers.length -1 ]
    return parseInt(final)
    
}

const dataFile = fs.readFileSync("./data.txt");
const dataArray = dataFile.toString().split("\n")
var result = 0;
dataArray.forEach(entry => result += parseInputString(entry))
console.log(result)

