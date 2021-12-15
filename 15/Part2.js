const fs = require('fs');
const { isUint8ClampedArray } = require('util/types');

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split("\r\n");
function Run() {
    var Matrix = []
    input.forEach(line => {
        Matrix.push(line.split("").map(Number))
    });
    Matrix = EnlargeMap(Matrix, 5)




    var startpos = { x: 0, y: 0 }
    var endpos = { x: Matrix.length - 1, y: Matrix[0].length - 1 }
    var min = Infinity
    var h = function (pos) {
        return Math.abs(pos.x - endpos.x) + Math.abs(pos.y - endpos.y)
    }
    AStar(startpos, endpos, h, Matrix)
}

function EnlargeMap(Matrix, HowMuch) {
    var LittleMatrix = JSON.parse(JSON.stringify(Matrix))
    var Bigmatrix = JSON.parse(JSON.stringify(Matrix))
    for (let i = 1; i < HowMuch + HowMuch; i++) {
        LittleMatrix = MapPlusOne(LittleMatrix)
            Bigmatrix.forEach((line, x) => {
                if (Bigmatrix[x].length < LittleMatrix[0].length * HowMuch) {
                    Bigmatrix[x]=line.concat(LittleMatrix[x % LittleMatrix.length])
                }
            })
        if(Bigmatrix.length < LittleMatrix.length * HowMuch){
            Bigmatrix = Bigmatrix.concat(JSON.parse(JSON.stringify(LittleMatrix)))
        }
    }
    return Bigmatrix
}

function MapPlusOne(Matrix) {
    for (let x = 0; x < Matrix.length; x++) {
        const line = Matrix[x];
        for (let y = 0; y < line.length; y++) {
            const element = line[y];
            if (element == 9) {
                Matrix[x][y] = 1
            }
            else {
                Matrix[x][y] = element + 1
            }
        }
    }
    return Matrix
}

function AStar(start, goal, h, Matrix) {
    var open = new Map()
    var allNodes = new Map()
    open.set(start, { g: 0, f: h(start) })
    allNodes.set(start, { g: 0, f: h(start) })
    while (open.size > 0) {
        var next = GetLowestF(open)
        open.delete(next)
        if (next.x == goal.x && next.y == goal.y) {
            console.log(allNodes.get(next).g)
            return
        }
        var neighbours = GetNeighbours(next, Matrix)
        neighbours.forEach(neighbour => {
            var g = allNodes.get(next).g + Matrix[neighbour.x][neighbour.y]
            var NeighbourG = GetG(neighbour, allNodes)
            if (g < NeighbourG) {
                allNodes.set(neighbour, { g: g, f: g + h(neighbour) })
                if (!open.has(neighbour)) {
                    open.set(neighbour, { g: g, f: g + h(neighbour) })
                    //console.log("Adding " + neighbour.x + "," + neighbour.y + " with g=" + g + " and f=" + (g + h(neighbour)))
                }
            }
        })
    }
}

function GetLowestF(map) {
    var lowest = Infinity
    var lowestpos = { x: 0, y: 0 }
    map.forEach((value, key) => {
        if (value.f < lowest) {
            lowest = value.f
            lowestpos = key
        }
    })
    return lowestpos
}

function GetG(curr, map) {
    var g = Infinity
    map.forEach((value, key) => {
        if (key.x == curr.x && key.y == curr.y) {
            g = value.g
        }
    })
    return g
}

function GetNeighbours(curr, Matrix) {
    var neighbours = []
    if (curr.x > 0) {
        neighbours.push({ x: curr.x - 1, y: curr.y })
    }
    if (curr.x < Matrix.length - 1) {
        neighbours.push({ x: curr.x + 1, y: curr.y })
    }
    if (curr.y > 0) {
        neighbours.push({ x: curr.x, y: curr.y - 1 })
    }
    if (curr.y < Matrix[0].length - 1) {
        neighbours.push({ x: curr.x, y: curr.y + 1 })
    }
    return neighbours
}



module.exports = Run;
//Start timer
var startTime = new Date().getTime();
Run();
//End timer
var endTime = new Date().getTime();
var timeTaken = endTime - startTime;
console.log("Time taken: " + timeTaken + "ms");