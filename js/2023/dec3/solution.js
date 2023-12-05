var fs = require("fs");

const dataFile = fs.readFileSync("./data.txt");
const engineLine = dataFile.toString().split("\n")

const isSymbol = (value) => {
    return isNaN(value) && value !== (".")
}

const isInt = (value) => {
    return !isNaN(value)
}

const symbolPositions = (line) => {
    const symbolPositions = [];
    var lineArr = line.split("")
    for(let i = 0; i < lineArr.length; i++){
        if(isSymbol(lineArr[i])){
            symbolPositions.push(i)
        }
    }
    return symbolPositions
}

const numberPositions = (line) => {
    let regexp = /\d+/g;
    var numberPositionsByLine = new Map();
    let matches = [...line.matchAll(regexp)];
    matches.forEach((match) => {
        numberPositionsByLine.set(match.index, match[0])
    });
    return numberPositionsByLine
}

const symbolPositionsByLine = new Map()
const numberPositionsByLine = new Map()

for(let i = 0; i < engineLine.length; i++){
    const lineSymbols = symbolPositions(engineLine[i])
    symbolPositionsByLine.set(i, lineSymbols)
    const numbers = numberPositions(engineLine[i])
    numberPositionsByLine.set(i, numbers)
}


const positionsToCheckForNumbers = new Set()

for(const [key, value] of symbolPositionsByLine){
    if(value.size === 0){continue;}
    value.forEach(symbol => {
        positionsToCheckForNumbers.add([key-1, symbol - 1])
        positionsToCheckForNumbers.add([key-1, symbol])
        positionsToCheckForNumbers.add([key-1, symbol + 1])

        positionsToCheckForNumbers.add([key, symbol - 1])
        positionsToCheckForNumbers.add([key, symbol + 1])

        positionsToCheckForNumbers.add([key+1, symbol - 1])
        positionsToCheckForNumbers.add([key+1, symbol])
        positionsToCheckForNumbers.add([key+1, symbol + 1])

    })
}

var total = 0;


const checkPositionForNumber = (positionsToCheckForNumbers, numberPositionsByLine) => {
    for(const [key, value] of numberPositionsByLine){
        const numbersInLine = value
        allPositionsInLineToCheck = [...positionsToCheckForNumbers].filter(arr => arr[0] === key).map(arr => arr[1])
        let uniquePositionsToCheck = [...new Set(allPositionsInLineToCheck)]
        allPositionsWithNumbers = []
        for(const [numKey, numValue] of numbersInLine){
            var lengthOfNumber = numValue.length;
            var possiblePositions = []
            var i = 0;
            while(i < lengthOfNumber){
                possiblePositions.push(numKey+i)
                i++
            }
            allPositionsWithNumbers.push(possiblePositions)
        }
        uniquePositionsToCheck.forEach(pos=> {
            var numbersInLine = allPositionsWithNumbers.length
            var i = 0;
            while(i<numbersInLine){
                if(allPositionsWithNumbers[i].includes(pos)){
                    var gotit = allPositionsWithNumbers[i][0]
                    if(isInt(value.get(gotit))){
                        total += parseInt(value.get(gotit))
                        value.delete(gotit)
                    }
                
                }
                i++;
            }
        })
    }
    

}

checkPositionForNumber(positionsToCheckForNumbers, numberPositionsByLine)


console.log(total)


