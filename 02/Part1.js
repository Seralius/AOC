const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')
input = input.split("\r\n");
function Run(){
    var depth = 0;
    var pos = 0;
    input.forEach(element => {
        if (element.startsWith("forward")) {
            num = element.split(" ")[1]
            pos += parseInt(num);
        }
        if (element.startsWith("up")) {
            num = element.split(" ")[1]
            depth -= parseInt(num);
        }
        if (element.startsWith("down")) {
            num = element.split(" ")[1]
            depth += parseInt(num);
        }
    });
    console.log(pos * depth);
}
module.exports = Run;
Run();