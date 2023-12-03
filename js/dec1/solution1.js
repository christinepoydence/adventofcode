const fs = require("fs");

const isInt = (value) => {
    return !isNaN(value)
}

const parseInputString = (string) => {
   const numbers = [];
    const arr = string.split("")
    for (let i = 0; i < string.length; i++) {
        if(isInt(arr[i])){
            numbers.push(arr[i])
            break;
        }
    }
    for (let i = string.length; i > 0; i--) {
        if(isInt(arr[i])){
            numbers.push(arr[i])
            break;
        }
    }
    const final = numbers[0] + numbers[numbers.length -1 ]
    return parseInt(final)
    
}

const dataFile = fs.readFileSync("./data.txt");
const dataArray = dataFile.toString().split("\n")
const result = 0;
dataArray.forEach(entry => result += parseInputString(entry))
console.log(result)

