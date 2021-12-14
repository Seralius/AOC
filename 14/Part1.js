const fs = require('fs')

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split("\r\n");
function Run() {
    var Polymer = input[0]
    var Rules = []
    input.slice(2).forEach(function (line) {
        var Rule = line.split(" -> ")
        var Insertion = {
            Pattern: Rule[0],
            Insert: Rule[1]
        }
        Rules.push(Insertion)
    })
    var Steps = 10
    for (let i = 0; i < Steps; i++) {
        Polymer = ApplyRuleset(Polymer, Rules)
        console.log(Polymer.length)
    }
    var Chars = Polymer.split("").filter(function(i,pos,self){ return self.indexOf(i) == pos}).join("")
    var CharsCount = []
    Chars.split("").forEach(function (char) {
        var Count = Polymer.match(new RegExp(char, "g")).length
        CharsCount.push({
            Char: char,
            Count: Count
        })
    })
    CharsCount.sort(function (a, b) {
        return a.Count - b.Count
    })
    var Sum = CharsCount[CharsCount.length - 1].Count - CharsCount[0].Count
    console.log("Answer: " + Sum)
}

function ApplyRuleset(Polymer, Rules) {
    var Pairs = []
    for (let i = 0; i < Polymer.split("").length - 1; i++) {
        const e1 = Polymer.split("")[i];
        const e2 = Polymer.split("")[i + 1];
        Pairs.push(e1 + e2)
    }
    var InsertAfters = []
    for (let i = 0; i < Pairs.length; i++) {
        const pair = Pairs[i];
        Rules.forEach(function (rule) {
            if (pair == rule.Pattern) {
                InsertAfters.push({
                    Position: i,
                    Insert: rule.Insert
                })
            }
        })
    }
    InsertAfters.sort(function (a, b) {
        return b.Position - a.Position
    })
    InsertAfters.forEach(function (insert) {    
        Polymer = Polymer.slice(0, insert.Position + 1) + insert.Insert + Polymer.slice(insert.Position + 1)
    })
    return Polymer
}


module.exports = Run;
//Start timer
var startTime = new Date().getTime();
Run();
//End timer
var endTime = new Date().getTime();
var timeTaken = endTime - startTime;
console.log("Time taken: " + timeTaken + "ms");