const fs = require('fs')

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split("\r\n");
function Run() {
    var Area = input[0].match(/(?<=x=|y=).*?(?=,|$)/g)
    Area = {x: Area[0].split("..").map(Number), y: Area[1].split("..").map(Number)}
    var Start = { x: 0, y: 0 }
    var Highest = -Infinity
    var Amount = 0;
    for (let x = -500; x < 700; x++) {
        for (let y = -500; y < 700; y++) {
            var Pos = Move(Start, {x: x, y: y}, Area)
            if (Pos != undefined){
                Amount++;
                if (Pos > Highest) {
                    Highest = Pos
                }
            }
        }
        
    }
    console.log(Amount)
}

function Move(Point, velocity, Area) {
    var HighestY = -Infinity
    var NewPoint = { x: Point.x, y: Point.y }
    var CheckSize = 4000
    var Step = 0;
    while (Step < CheckSize) {
        NewPoint = { x: NewPoint.x + velocity.x, y: NewPoint.y + velocity.y }
        if(HighestY < NewPoint.y) {
            HighestY = NewPoint.y
        }
        if (velocity.x != 0) {
            velocity.x = velocity.x < 0 ? velocity.x + 1 : velocity.x - 1
        }
        velocity.y = velocity.y - 1
        if (NewPoint.x >= Area.x[0] && NewPoint.x <= Area.x[1] && NewPoint.y >= Area.y[0] && NewPoint.y <= Area.y[1]) {
            return HighestY
        }
        Step++;
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