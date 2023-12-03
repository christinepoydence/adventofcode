var fs = require("fs");

const dataFile = fs.readFileSync("./data.txt");
const arr = dataFile.toString().split("")
var floors = 0;

arr.forEach(element => {
    element === '(' ? floors++ : floors--;
});
console.log(floors)
