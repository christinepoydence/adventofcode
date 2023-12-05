var fs = require("fs");

const dataFile = fs.readFileSync("./data.txt");
const scratchcard = dataFile.toString().split("\n")

const parseCard = (scratchcard) => {
    const [card, details] = scratchcard.split(":")
    const [winningString, actualString] = details.split("|")
    const winningNumbers = winningString.trim().split(" ").filter(n => n)
    const actualNumbers = actualString.trim().split(" ").filter(n => n)
    return [actualNumbers, winningNumbers]
}

const findCardValue = (actual, winning) => {
    var totalWinningValues = 0;
    actual.forEach(num => {
        if(winning.includes(num)){
            totalWinningValues++;
        }
    })
    if(totalWinningValues > 0){
        return 2**(totalWinningValues-1)
    }else {
        return 0;
    }
}

var total = 0;

scratchcard.forEach(card => {
    const [actualNumbers, winningNumbers] = parseCard(card)
    total += findCardValue(actualNumbers, winningNumbers)
})
console.log(total)

