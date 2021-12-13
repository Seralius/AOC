const fs = require('fs')

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split("\r\n");
function Run() {
    var x, y = 0;
    var maxx, maxy = 0;
    var Matrix = [];
    input.forEach(element => {
        if (!element.includes("fold") && element != '') {
            var xy = element.split(",").map(Number);
            x = x > xy[0] ? x : xy[0];
            y = y > xy[1] ? y : xy[1];
        }
    });
    maxx = x;
    maxy = y;
    var Matrix = new Array(y + 1);
    for (var i = 0; i < y + 1; i++) {
        Matrix[i] = new Array(x + 1).fill(0);
    }
    var foldingTime = false;
    input.forEach(element => {
        foldingTime = !foldingTime ? element == '' : foldingTime;
        if (!foldingTime) {
            var xy = element.split(",").map(Number);
            Matrix[xy[1]][xy[0]] = 1;
        }
        else if (element != '') {
            if (element.startsWith("fold along y")) {
                var num = element.match(/(?<==)\d+/);
                for (let i = maxy; i > num; i--) {
                    const line = Matrix[i];
                    var Supposed = Matrix[maxy - i];
                    for (let j = 0; j < line.length; j++) {
                        if (line[j] == 1) {
                            Supposed[j] = 1;
                        }
                    }
                }
                maxy = num - 1;
            }
            else if (element.startsWith("fold along x")) {
                var num = element.match(/(?<==)\d+/);
                for (let i = maxx; i > num; i--) {
                    Matrix.forEach(line => {
                        if (line[i] == 1) {
                            line[maxx - i] = 1;
                        }
                    });
                }
                maxx = num - 1;
            }
            LogMatrix(Matrix, maxx, maxy);
        }
    });
}
function LogMatrix(Matrix, maxx, maxy) {
    var String = "";
    var count = 0;
    for (let i = 0; i < maxy + 1; i++) {
        for (let j = 0; j < maxx + 1; j++) {
            String += Matrix[i][j] == 1 ? "#" : " ";
            count += Matrix[i][j] == 1 ? 1 : 0;
        }
        String += "\n";
    }
    console.log(String);
    console.log(count);
}
module.exports = Run;
//Start timer
var startTime = new Date().getTime();
Run();
//End timer
var endTime = new Date().getTime();
var timeTaken = endTime - startTime;
console.log("Time taken: " + timeTaken + "ms");