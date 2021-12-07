const fs = require('fs')

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split("\r\n");
function Run() {
    var AllNums = Rawinput.match(/\d+/g);
    var Highest = Math.max(...AllNums);
    var Matrix = new Array(Highest + 1)
    for (var i = 0; i < Matrix.length; i++) {
        Matrix[i] = new Array(Highest + 1).fill(0);
    }
    input.forEach(element => {
        var [x1, y1] = element.split(" -> ")[0].split(",");
        var [x2, y2] = element.split(" -> ")[1].split(",");
        x1 = parseInt(x1);
        y1 = parseInt(y1);
        x2 = parseInt(x2);
        y2 = parseInt(y2);
        if (x1 == x2) {
            var [small, big] = y1 < y2 ? [y1, y2] : [y2, y1];
            for (let i = small; i < big +1; i++) {
                Matrix[i][x1]++;
            }
        }
        else if (y1 == y2) {
            var [small, big] = x1 < x2 ? [x1, x2] : [x2, x1];
            for (let i = small; i < big+1; i++) {
                Matrix[y1][i]++;
            }
        }
    });
    var SumOfTwos = 0;
    Matrix.forEach(element => {
        SumOfTwos += element.filter(x => x >= 2).length;
    });
    console.log(SumOfTwos);
    var output = "";
    var Colors = ["\x1b[31m", "\x1b[32m", "\x1b[33m", "\x1b[34m", "\x1b[35m", "\x1b[36m", "\x1b[37m"];
    Matrix.forEach(Row => {
        Row.forEach(element => {
            if (element == 0) {
                output += "\x1b[37m.\x1b[0m";
            }
            else{
                output += Colors[element - 1] + element + "\x1b[0m";
            }
        })
        output += "\n";
    })
    console.log(output);
}
module.exports = Run;
//Start timer
var startTime = new Date().getTime();
Run();
//End timer
var endTime = new Date().getTime();
var timeTaken = endTime - startTime;
console.log("Time taken: " + timeTaken + "ms");