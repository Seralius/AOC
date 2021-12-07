const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')
input = input.split("\r\n").map(Number);
function Run(){
    var out = 0;
    var before = 99999;
    for (let i = 0; i < input.length; i++) {
        const element = input[i];
        if(before < element){
            out++;
        }
        before = element;
    }
    console.log(out);
}
module.exports = Run;
Run();