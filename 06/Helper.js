const fs = require('fs')

var Rawinput = fs.readFileSync("Helper.txt").toString('utf-8')

input = Rawinput.split("\r\n");

input.forEach(element => {
    var Output = ""
    var Nums = element.match(/\d(?=,)|\d$/g)
    for (let i = 0; i < 9; i++) {
        var HowMany = Nums.filter(x => x == i).length
        Output += HowMany + ";"
    }
    console.log(Output)
});