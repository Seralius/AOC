const { Console } = require('console');
const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')
input = input.split("\r\n");
function Run(){
    var OxyGenRating = 0;
    var CO2Scrubber = 0;
    var List = input;
    var CurrentBit = 0;
    var Pattern = "";
    while(List.length > 1){
        var MostSignificant = GetMostSignificantBit(List, CurrentBit);
        if (MostSignificant > 0){
            Pattern += "1";
        }
        else if (MostSignificant < 0){
            Pattern += "0";
        }
        else if (MostSignificant == 0){
            Pattern += "1";
        }
        CurrentBit++;
        List = List.filter((e) => e.startsWith(Pattern));
        console.log("Current Pattern: " + Pattern);
        console.log("Resulting List: " + List);
    }
    OxyGenRating = parseInt(List[0], 2);
    var List = input;
    CurrentBit = 0;
    Pattern = "";
    while(List.length > 1){
        var MostSignificant = GetMostSignificantBit(List, CurrentBit);
        if (MostSignificant > 0){
            Pattern += "0";
        }
        else if (MostSignificant < 0){
            Pattern += "1";
        }
        else if (MostSignificant == 0){
            Pattern += "0";
        }
        CurrentBit++;
        List = List.filter((e) => e.startsWith(Pattern));
    }
    CO2Scrubber = parseInt(List[0], 2);
    console.log(OxyGenRating * CO2Scrubber);
}

function GetMostSignificantBit(strings, pos){
    var Counter = 0;
    for (let i = 0; i < strings.length; i++) {
        const element = strings[i];
        if (element[pos] == "1"){
            Counter++;
        }
        else if (element[pos] == "0"){
            Counter--;
        }
    }
    return Counter;
}

module.exports = Run;
Run();