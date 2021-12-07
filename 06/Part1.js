const fs = require('fs')

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split("\r\n");
function Run() {
    var Nums = input[0].split(",").map(BigInt)
    var Fishes = []
    Nums.forEach(function (num) {
        var Fish = {
            DaysTillHatch: num
        }
        Fishes.push(Fish)
    });
    var Day = 0
    while (Day < 80)
    {
        Day++
        Fishes.forEach(function (Fish) {
            if (Fish.DaysTillHatch != 0)
            {
                Fish.DaysTillHatch--
            }
            else
            {
                Fishes.push({
                    DaysTillHatch: 8
                })
                Fish.DaysTillHatch = 6
            }
        })
        if(Day % 10 == 0)
        {
            console.log("There are " + Fishes.length + " fishes on day " + Day)
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