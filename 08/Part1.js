const fs = require('fs')

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split("\r\n");
function Run() {
    var Sum = 0;
    input.forEach(element => {
        var Output = element.split(" | ")[1];
        var Nums = Output.split(" ");
        Nums.forEach(segment => {
            switch (segment.length) {
                case 2:
                case 3:
                case 4:
                case 7:
                    Sum++;
                    break;
            }
        })
    });
    console.log(Sum);
}
module.exports = Run;
//Start timer
var startTime = new Date().getTime();
Run();
//End timer
var endTime = new Date().getTime();
var timeTaken = endTime - startTime;
console.log("Time taken: " + timeTaken + "ms");