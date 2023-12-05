var fs = require("fs");

const dataFile = fs.readFileSync("./data.txt").toString().split("\n");


const parseCard = (scratchcard) => {
    const [card, details] = scratchcard.split(":")
    const [winningString, actualString] = details.split("|")
    const winningNumbers = winningString.trim().split(" ").filter(n => n)
    const actualNumbers = actualString.trim().split(" ").filter(n => n)
    return [actualNumbers, winningNumbers]
}

const cards = dataFile.map(line => {
    return parseCard(line)
})

//start with one of each card
const copies = new Array(cards.length).fill(1)

const additionalCardCount = (winningValues, actualValues) => {
    var totalAdditionalCards = 0;
    actualValues.forEach(value => {
        if(winningValues.includes(value)){
            totalAdditionalCards++;
        }
    })
    return totalAdditionalCards
}

// Sample:
// Card 1 has 2 winning numbers, Card 2 has 2 winning numbers, Card 3 has 1 winning numbers, Card 4 has 0 winning numbers
// Card 1: i = 0, 2 extraCardsToAdd, copies [1,1,1,1]
// After Card 1: copies: [1,2,2,1]
// Card 2: i = 1; 2 extraCardsToAdd
// After card 2: copies: [1,2,4,3]
// Card 3: i = 2; 1 extra card to add
// After card 3: copies: [1,2,4,7]
// Card 4, 0 extra cards to add
// After card 4: copies: [1,2,4,7]
//14 total cards
//pattern: add the value at position i to positions [1+i, 2+i, ... , extraCardsToAdd + i]
cards.forEach(([winningNumbers, actualNumbers], i) => {
    let extraCardsToAdd = additionalCardCount(winningNumbers, actualNumbers)
    while (extraCardsToAdd) {
        copies[i + extraCardsToAdd--] += copies[i]
    }
})

//add all totals in the array together
const total = copies.reduce((partialSum, a) => partialSum + a, 0)

console.log(total);
