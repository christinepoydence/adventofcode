var fs = require("fs");

const dataFile = fs.readFileSync("./data.txt");
const arr = dataFile.toString().split("")
var floors = 0;
var answer = 0;
for(let i = 0; i < arr.length; i++){
    arr[i] === '(' ? floors++ : floors--;
    if(floors === -1){
        answer = i+1;
        break;
    }
 }
console.log(answer)
