const fs = require('fs')

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split(",").map(Number);
function Run() {
    var Biggest = Math.max(...input)
    var Smallest = Math.min(...input)
    var SmallestSteps = 9999999999999
    var Num = 0;
    for (var i = Smallest; i <= Biggest; i++) {
        var Steps = CalcExpenses(input, i)
        if(Steps < SmallestSteps){
            //console.log("New Smallest: " + i + " (Fuel Cost: " + Steps + ")")
            SmallestSteps = Steps
            Num = i
        }
    }
    console.log(SmallestSteps)
    console.log(Num)
}
function CalcExpenses(Nums, to){
    var Sum = 0;
    Nums.forEach(element => {
        var StepsToDo = Math.abs(to - element)
        for (var i = 0; i < StepsToDo; i++) {
            Sum += 1+i
        }
    });
    return Sum;
}
module.exports = Run;
//Start timer
var startTime = new Date().getTime();
Run();
//End timer
var endTime = new Date().getTime();
var timeTaken = endTime - startTime;
console.log("Time taken: " + timeTaken + "ms");