const fs = require('fs')

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split("\r\n");
function Run() {
    var Matrix = []
    input.forEach(element => {
        var line = element.split("").map(Number)
        var RealLine = []
        line.forEach(element => {
            RealLine.push({
                num: element,
                flashed: false
            })
        })
        Matrix.push(RealLine)
    });
    var Flashes = 0;
    var Steps = 100;
    for (var i = 0; i < Steps; i++) {
        Matrix.forEach(line => {
            line.forEach(element => {
                element.num++;
            });
            var MoreFlashes = true;
            while (MoreFlashes) {
                MoreFlashes = false;
                for (let x = 0; x < Matrix.length; x++) {
                    const line = Matrix[x];
                    for (let y = 0; y < line.length; y++) {
                        const Element = line[y];
                        if (Element.num > 9 && !Element.flashed) {
                            MoreFlashes = true;
                            Element.flashed = true;
                            Flashes++;
                            var Adjacents = GetAllAdjacents(Matrix, x, y)
                            Adjacents.forEach(element => {
                                element.num++;
                            });
                        }
                    }
                }
            }
        })
        Matrix.forEach(line => {
            line.forEach(element => {
                if (element.flashed) {
                    element.num = 0;
                    element.flashed = false;
                }
            });
        });
        var Step = i + 1;
        if (Step % 10 == 0) {
            var String = "";
            Matrix.forEach(line => {
                line.forEach(element => {
                    String += element.num
                });
                String += "\n"
            });
            console.log(String)
            console.log(Flashes)
        }
    }
}
function GetAllAdjacents(Matrix, x, y) {
    var Adjacents = []
    if (x - 1 >= 0) {
        Adjacents.push(Matrix[x - 1][y])
    }
    if (x + 1 < Matrix.length) {
        Adjacents.push(Matrix[x + 1][y])
    }
    if (y - 1 >= 0) {
        Adjacents.push(Matrix[x][y - 1])
    }
    if (y + 1 < Matrix.length) {
        Adjacents.push(Matrix[x][y + 1])
    }
    if (x - 1 >= 0 && y - 1 >= 0) {
        Adjacents.push(Matrix[x - 1][y - 1])
    }
    if (x + 1 < Matrix.length && y - 1 >= 0) {
        Adjacents.push(Matrix[x + 1][y - 1])
    }
    if (x - 1 >= 0 && y + 1 < Matrix.length) {
        Adjacents.push(Matrix[x - 1][y + 1])
    }
    if (x + 1 < Matrix.length && y + 1 < Matrix.length) {
        Adjacents.push(Matrix[x + 1][y + 1])
    }
    return Adjacents
}
module.exports = Run;
//Start timer
var startTime = new Date().getTime();
Run();
//End timer
var endTime = new Date().getTime();
var timeTaken = endTime - startTime;
console.log("Time taken: " + timeTaken + "ms");