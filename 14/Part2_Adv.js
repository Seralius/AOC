const fs = require('fs')

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split("\r\n");
function Run() {
    var Rules = input.slice(2).map(function (line) {
        const [a, b] = line.split(" -> ")
        return { a, b }
    })
    const Count = (string) => {
        var letters = {}
        for (letter of string){
            if (letters[letter]){
                letters[letter]++
            } else {
                letters[letter] = 1
            }
        }
        return letters
    }
    const steps = 40;
    
    var Pairs = {}
    var letters = Count(input[0])

    for (let i = 0; i < input[0].length - 1; i++) {
        const element = input[0][i] + input[0][i + 1]
        Pairs[element] = 1
    }

    for (let i = 0; i < steps; i++) {
        var newPairs = {}
        for(var pair of Object.keys(Pairs)){
            var now = Pairs[pair]

            var Rule = Rules.find(function (rule) {
                return pair == rule.a
            })
            var [a,b] = pair.split("")
            newPairs[a+Rule.b] = newPairs[a+Rule.b] ? newPairs[a+Rule.b] + now : now
            newPairs[Rule.b+b] = newPairs[Rule.b+b] ? newPairs[Rule.b+b] + now : now 
            letters[Rule.b] = letters[Rule.b] ? letters[Rule.b] + now : now
        }
        Pairs = newPairs
        console.log("Step: " + i)
    }
    var min = Object.values(letters).sort(function (a, b) {
        return a - b
    })[0]
    var max = Object.values(letters).sort(function (a, b) {
        return b - a
    })[0]
    console.log(max-min)
}

function CalcStep(input, Rules){
    
}

module.exports = Run;
//Start timer
var startTime = new Date().getTime();
Run();
//End timer
var endTime = new Date().getTime();
var timeTaken = endTime - startTime;
console.log("Time taken: " + timeTaken + "ms");