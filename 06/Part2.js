const { Console } = require('console');
const fs = require('fs')

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split("\r\n");
function Run() {
    var HatchNumbers = input[0].split(",").map(BigInt);
    var AllFishes = new Array(10).fill(0n);
    //Initialize Hatching-Day of Fishes
    HatchNumbers.forEach(function (element) {
        AllFishes[element]++;
    })
    //Simulate 80 Days
    var Days = 123456;
    for (var i = 0; i < Days; i++) {
        //First Element in List
        var DayZero = AllFishes[0];
        //Day - 1
        for (let Day = 0; Day < 9; Day++) {
            AllFishes[Day] = AllFishes[Day + 1];
        }
        AllFishes[9] = 0n;
        //Log the Result
        var output = "";
        AllFishes.forEach(function (element) {
            output += element + ",";
        })
        //console.log(output);
        if (i == Days - 1) {
            //Print the Result
            AllFishes[9] = 0n
            var Sum = AllFishes.reduce(function (a, b) {
                return a + b;
            });
            console.log(Sum);
        }
        //Check for all Fishes that are hatching this Day
        if (AllFishes[0] > 0) {
            //Add the new Fish to the List on Day 8
            AllFishes[9] += AllFishes[0];
            //Reset the Hatch-Day of the Fishes to 6
            AllFishes[7] += AllFishes[0];
        }
    }
}
module.exports = Run;
//Start timer
var startTime = new Date().getTime();
Run();
//End timer
var endTime = new Date().getTime();
var timeTaken = endTime - startTime;
console.log("Time taken: " + timeTaken + "ms");