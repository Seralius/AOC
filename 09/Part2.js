const fs = require('fs')

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split("\r\n");
for (let i = 0; i < input.length; i++) {
    const element = input[i];
    input[i] = element.split("").map(Number);
}
function Run() {
    var Basins = [];
    input.forEach((row, x) => {
        row.forEach((col, y) => {
            if (IsLowest(x, y) != 0) {
                Basins.push(GetBasin(x, y));
            }
        });
    });
    Basins = Basins.sort(function(a, b){return b-a})
    console.log(Basins[0]* Basins[1] * Basins[2]);
}
function IsLowest(x, y) {
    var Input = input[x][y];
    var Adjacents = [
        x == 0 ? 99 : input[x - 1][y],
        x == input.length - 1 ? 99 : input[x + 1][y],
        y == 0 ? 99 : input[x][y - 1],
        y == input[x].length - 1 ? 99 : input[x][y + 1]
    ]
    if (Input < Adjacents.sort()[0]) {
        return 1 + Input;
    }
    return 0;
}
function GetBasin(x, y) {
    var Points = [{ x: x, y: y }];
    var StartingPoint = input[x][y];
    var OnlyNines = false;
    while (!OnlyNines) {
        var OnlyNines = true;
        Points.forEach(point => {
            //Check Up
            if (point.y != 0 && input[point.x][point.y - 1] != 9) {
                var AlreadyIn = false
                Points.forEach(point2 => {
                    if (point2.x == point.x && point2.y == point.y - 1) {
                        AlreadyIn = true;
                    }
                });
                if (!AlreadyIn) {
                    OnlyNines = false;
                    Points.push({ x: point.x, y: point.y - 1 });
                }
            }
            //Check Down
            if (point.y + 1 != input[0].length && input[point.x][point.y + 1] != 9 && !Points.includes({ x: point.x, y: point.y + 1 })) {
                var AlreadyIn = false
                Points.forEach(point2 => {
                    if (point2.x == point.x && point2.y == point.y + 1) {
                        AlreadyIn = true;
                    }
                });
                if (!AlreadyIn) {
                    OnlyNines = false;
                    Points.push({ x: point.x, y: point.y + 1 });
                }
            }
            //Check Left
            if (point.x != 0 && input[point.x - 1][point.y] != 9 && !Points.includes({ x: point.x + 1, y: point.y })) {
                var AlreadyIn = false
                Points.forEach(point2 => {
                    if (point2.x == point.x - 1 && point2.y == point.y) {
                        AlreadyIn = true;
                    }
                });
                if (!AlreadyIn) {
                    OnlyNines = false;
                    Points.push({ x: point.x - 1, y: point.y});
                }
            }
            //Check Right
            if (point.x + 1 != input.length && input[point.x + 1][point.y] != 9 && !Points.includes({ x: point.x + 1, y: point.y })) {
                var AlreadyIn = false
                Points.forEach(point2 => {
                    if (point2.x == point.x + 1&& point2.y == point.y) {
                        AlreadyIn = true;
                    }
                });
                if (!AlreadyIn) {
                    OnlyNines = false;
                    Points.push({ x: point.x + 1, y: point.y});
                }
            }
        })
    }
    return Points.length;
}
module.exports = Run;
//Start timer
var startTime = new Date().getTime();
Run();
//End timer
var endTime = new Date().getTime();
var timeTaken = endTime - startTime;
console.log("Time taken: " + timeTaken + "ms");