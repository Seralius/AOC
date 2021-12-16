const fs = require('fs')

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split("\r\n");
function Run() {
    var LeadingZeros = new Map();
    LeadingZeros.set("0", "0000");
    LeadingZeros.set("1", "0001");
    LeadingZeros.set("2", "0010");
    LeadingZeros.set("3", "0011");
    LeadingZeros.set("4", "0100");
    LeadingZeros.set("5", "0101");
    LeadingZeros.set("6", "0110");
    LeadingZeros.set("7", "0111");
    LeadingZeros.set("8", "1000");
    LeadingZeros.set("9", "1001");
    LeadingZeros.set("A", "1010");
    LeadingZeros.set("B", "1011");
    LeadingZeros.set("C", "1100");
    LeadingZeros.set("D", "1101");
    LeadingZeros.set("E", "1110");
    LeadingZeros.set("F", "1111");
    var HexToBin = Rawinput.split("").map(x => LeadingZeros.get(x)).join("")
    var Outputs = PacketParser(HexToBin)
    while (Outputs[0] != "done") {
        Outputs = PacketParser(Outputs[0])
    }
    console.log(VersionNums)
}
var VersionNums = 0;
function PacketParser(packetstring){
    var Version = parseInt(packetstring[0] + packetstring[1] + packetstring[2], 2)
    VersionNums += Version
    var Type = parseInt(packetstring[3] + packetstring[4] + packetstring[5], 2)
    var Outputs = []
    if (Type == 4) {
        var Num = ""
        var isLast = false
        var Step = 6
        while (!isLast) {
            var NumCheck = packetstring.slice(Step, Step + 5)
            Num += NumCheck[1] + NumCheck[2] + NumCheck[3] + NumCheck[4]
            if (NumCheck.startsWith("0")) {
                isLast = true
                if (packetstring.length > Step + 5) {
                    Outputs.push(packetstring.slice(Step + 5, packetstring.length))
                }
            }
            else {
                Step += 5
            }
        }
    }
    else if(Type != 4) {
        var LengthType = packetstring[6]
        var NumOfPackets;
        var LengthOfPackets;
        if (LengthType == "0") {
            LengthOfPackets = parseInt(packetstring.slice(7, 7+15), 2)
            Outputs.push(packetstring.slice(7+15, packetstring.length))
        }
        else if (LengthType == "1") {
            NumOfPackets = parseInt(packetstring.slice(7, 7+11), 2)
            Outputs.push(packetstring.slice(7+11, packetstring.length))
        }
    }
    if (Outputs.length == 0 || Outputs.every(x => x.match(/^0+$/))) {
        Outputs = ["done"]
    }
    return Outputs
}


module.exports = Run;
//Start timer
var startTime = new Date().getTime();
Run();
//End timer
var endTime = new Date().getTime();
var timeTaken = endTime - startTime;
console.log("Time taken: " + timeTaken + "ms");