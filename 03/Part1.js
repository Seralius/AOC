const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')
input = input.split("\r\n");
function Run(){
    var Counter = [];
    for (let i = 0; i < input[1].length; i++) {
        const element = input[1][i];
        Counter[i] = 0;
    }
    input.forEach(binary => {
        for (let i = 0; i < binary.length; i++) {
            const num = binary[i];
            if (num == 1) {
                Counter[i]++;
            }
            if (num == 0) {
                Counter[i]--;
            }
        }
    });
    var MostSignificant = "";
    var LeastSignificant = "";
    for (let i = 0; i < Counter.length; i++) {
        const element = Counter[i];
        if (Counter[i] > 0) {
            MostSignificant += "1";
            LeastSignificant += "0";
        }
        else {
            MostSignificant += "0";
            LeastSignificant += "1";
        }
    }
    var TrueMost = parseInt(MostSignificant, 2);
    var TrueLeast = parseInt(LeastSignificant, 2);
    console.log( TrueMost * TrueLeast);
}
module.exports = Run;
Run();