
var fs = require("fs");

const roundDetails = (round) => {
    var isPossible = []; 
    var colorGroupings = round.split(",");
    colorGroupings.forEach(colorInfo => {
        var [count, color] = colorInfo.trim().split(" ")
        if(color === 'red' && parseInt(count) > 12){
            isPossible.push(false);
        }
        else if(color === 'green' && parseInt(count) > 13){
            isPossible.push(false);
        }
        else if(color === 'blue' && parseInt(count) > 14){
            isPossible.push(false);
        } else{
            isPossible.push(true);
        }
    });

    return isPossible.every(Boolean)
}


const minimumCubes = (rounds) => {
    var maxRed = 0;
    var maxGreen = 0;
    var maxBlue = 0;
    rounds.forEach(round => {
        var colorGroupings = round.split(",");
        colorGroupings.forEach(colorGrouping => {
            var [count, color] = colorGrouping.trim().split(" ")
            if(color === 'red' && parseInt(count) > maxRed){
                maxRed = count;
            }
            else if(color === 'green' && parseInt(count) > maxGreen){
                console.log(count)
                maxGreen = count;
            }
            else if(color === 'blue' && parseInt(count) > maxBlue){
                maxBlue = count;
            }
        })
    })

    
    return maxRed*maxGreen*maxBlue;
}

const gameInfo = (details) => {
    var [gameTitle, allRounds] = details.split(":")
    var gameNumber = parseInt(gameTitle.split(" ")[1])
    var roundsArray = allRounds.split(";")
    return [gameNumber, roundsArray]
}


const gameTotal = (details) => {
    var [gameNumber, roundsArray] = gameInfo(details)
    return minimumCubes(roundsArray)
}

console.log(gameTotal("Game 1: 1 blue; 4 green, 5 blue; 11 red, 3 blue, 11 green; 1 red, 10 green, 4 blue; 17 red, 12 green, 7 blue; 3 blue, 19 green, 15 red"))

var dataFile = fs.readFileSync("./data.txt");
var dataArray = dataFile.toString().split("\n")
var result = 0;

dataArray.forEach(game => {
    result += gameTotal(game)
})
console.log(result)

// const isGamePossible = (details) => {
//     var [gameNumber, roundsArray] = gameInfo(details)
//     var roundIsPossible = []
//    roundsArray.forEach(round => {
//         roundIsPossible.push(roundDetails(round))
//     })
//     return [gameNumber, roundIsPossible.every(Boolean)]
// }

// var dataFile = fs.readFileSync("./data.txt");
// var dataArray = dataFile.toString().split("\n")
// var result = 0;

// dataArray.forEach(game => {
//     var [game, isPossible] =  isGamePossible(game)
//     if(isPossible){
//         result += game
//     }
// })
// console.log(result)



