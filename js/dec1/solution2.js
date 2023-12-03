var fs = require("fs");

const one = new RegExp("^one");
const two = new RegExp("^two");
const three = new RegExp("^three");
const four = new RegExp("^four");
const five = new RegExp("^five");
const six = new RegExp("^six");
const seven = new RegExp("^seven");
const eight = new RegExp("^eight");
const nine = new RegExp("^nine");

const isInt = (value) => {
    return !isNaN(value)
}

const startsANumber = (string, position) => {
    var section = string.substring(position)
    if(one.test(section)){
        return "1"
    }
    if(two.test(section)){
        return "2"
    }
    if(three.test(section)){
        return "3"
    }
    if(four.test(section)){
        return "4"
    }
    if(five.test(section)){
        return "5"
    }
    if(six.test(section)){
        return "6"
    }
    if(seven.test(section)){
        return "7"
    } 
    if(eight.test(section)){
        return "8"
    }
    if(nine.test(section)){
        return "9"
    }
    return null;
}

const parseInputString = (string) => {
    var numbers = [];
    var arr = string.split("")
    for (let i = 0; i < string.length; i++) {
        if(isInt(arr[i])){
            numbers.push(arr[i])
        }
        var startsANumberValue = startsANumber(string, i)
        if(startsANumberValue !== null){
            numbers.push(startsANumberValue)
        }
    }
    var final = numbers[0] + numbers[numbers.length -1 ]
    return parseInt(final)
    
}

var dataFile = fs.readFileSync("./data.txt");
var dataArray = dataFile.toString().split("\n")
var result = 0;
dataArray.forEach(entry => result += parseInputString(entry))
console.log(result)

