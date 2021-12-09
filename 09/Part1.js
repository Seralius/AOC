const fs = require('fs')

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split("\r\n");
for (let i = 0; i < input.length; i++) {
    const element = input[i];
    input[i] = element.split("").map(Number);
}
function Run() {
    var Sum = 0;
    input.forEach((row,x) => {
        row.forEach((col,y) => {
            Sum += IsLowest(x,y)
        });
    });
    console.log(Sum);
}
function IsLowest(x,y) {
    var Input = input[x][y];
    var Adjacents = [
        x == 0 ? 99 : input[x-1][y],
        x == input.length - 1 ? 99 : input[x+1][y],
        y == 0 ? 99 : input[x][y-1],
        y == input[x].length -1 ? 99 : input[x][y+1]
    ]
    if (Input < Adjacents.sort()[0]) {
        return 1 + Input;
    }
    return 0;
}
module.exports = Run;
//Start timer
var startTime = new Date().getTime();
Run();
//End timer
var endTime = new Date().getTime();
var timeTaken = endTime - startTime;
console.log("Time taken: " + timeTaken + "ms");