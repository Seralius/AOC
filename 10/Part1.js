const fs = require('fs')

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split("\r\n");
function Run() {
    var OpenChars = "([{<"
    var CloseChars = ")]}>"
    var Sum = 0;
    var Test = "";
    input.forEach(function (line) {
        var first = true
        var LineString = "";
        for (let i = 0; i < line.length; i++) {
            const element = line[i];
            if (OpenChars.includes(element)) {
                LineString += element;
            }
            else {
                var Expected = BuildString(LineString);
                if (Expected[i] != element && first) {
                    first = false
                    Sum += element == ")" ? 3 :
                        element == "]" ? 57 :
                            element == "}" ? 1197 :
                                element == ">" ? 25137 :
                                    0;
                }
                else{
                    LineString += element;
                }
            }
        }
    })
    console.log(Sum)
    function BuildString(input) {
        var selfbuilt = "";
        var closed = "";
        input = input.split("");
        input.forEach(function (element) {
            if (OpenChars.includes(element)) {
                selfbuilt += element;
                closed = closed.split("").reverse().join("")
                closed += CloseChars[OpenChars.indexOf(element)];
                closed = closed.split("").reverse().join("")
            }
            else {
                selfbuilt += element;
                closed = closed.slice(1);
            }
        })
        selfbuilt += closed;
        return selfbuilt;
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