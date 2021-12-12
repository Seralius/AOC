const fs = require('fs')

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split("\r\n");
function Run() {
    var Caves = {};
    input.forEach(function (line) {
        var Points = line.split("-");
        var from = Points[0];
        var to = Points[1];
        Caves[from] = Caves[from] || [];
        Caves[from].push(to);
        Caves[to] = Caves[to] || [];
        if (!Caves[to].includes(from)) {
            Caves[to].push(from);
        }
    })
    var DonePaths = [];
    var AllDone = false;
    var Paths = GetNext(Caves, "start");
    Paths.forEach(function (path) {
        DonePaths = SolvePath(path, DonePaths, Caves);
    })
    console.log(DonePaths.length);
}

var DonePaths = [];
function SolvePath(path, alreadyEnded, Caves) {
    if (path.endsWith("end") && !DonePaths.includes(path)) {
        DonePaths.push(path);
    }
    else {
        var next = GetNext(Caves, path);
        next.forEach(function (nextPath) {
            var Paths = SolvePath(nextPath, alreadyEnded, Caves);
        })
    }
    return DonePaths;
}

function GetNext(Caves, CurrentPath) {
    var NextPaths = [];
    var smallCave = /[a-z](?=,|$)/g;
    var CurrentNode = CurrentPath.split(",").pop();
    Caves[CurrentNode].forEach(function (node) {
        var maxAmount = 1;
        if (CurrentPath != "start") {
            var FilteredPath = CurrentPath.replace("start", "")
            var smallAmount = FilteredPath.match(smallCave)
            if (smallAmount != null) {
                smallAmount.forEach(function (smalls) {
                    var amount = FilteredPath.match(new RegExp(smalls, "g")).length
                    maxAmount = amount < maxAmount ? maxAmount : amount;
                })
            }
        }
        if (node != "start") {
            if (smallCave.test(node)) {
                if (!CurrentPath.includes(node)) {
                    NextPaths.push(CurrentPath + "," + node);
                }
                // else if (maxAmount < 2) {
                //     NextPaths.push(CurrentPath + "," + node);
                // }
            }
            else {
                NextPaths.push(CurrentPath + "," + node);
            }
        }
    })
    return NextPaths;
}



module.exports = Run;
//Start timer
var startTime = new Date().getTime();
Run();
//End timer
var endTime = new Date().getTime();
var timeTaken = endTime - startTime;
console.log("Time taken: " + timeTaken + "ms");