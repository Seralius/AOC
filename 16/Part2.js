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
    var Packet = getPacket(HexToBin);
    console.log(Packet.data)
}

function getPacket(BinPacket) {

    const packet = {};
    packet.version = parseInt(BinPacket.substr(0, 3), 2);
    packet.type = parseInt(BinPacket.substr(3, 3), 2);
    if (packet.type === 4) {
        var Num = ""
        var isLast = false
        var Step = 6
        while (!isLast) {
            var NumCheck = BinPacket.slice(Step, Step + 5)
            Num += NumCheck[1] + NumCheck[2] + NumCheck[3] + NumCheck[4]
            if (NumCheck.startsWith("0")) {
                isLast = true
                if (BinPacket.length > Step + 5) {
                    packet.data = parseInt(Num, 2)
                }
            }
            else {
                Step += 5
            }
        }
        packet.bitAfterLast = Step + 5;
    } else {
        let subs = [];
        let length;
        let substart;
        const isLong = BinPacket.substr(6, 1) === '0';
        if (isLong) {
            length = parseInt(BinPacket.substr(7, 15), 2);
            substart = 22;
        } else {
            length = parseInt(BinPacket.substr(7, 11), 2);
            substart = 18;
        }

        while (length > 0) {
            const subPack = getPacket(BinPacket.substr(substart));
            substart += subPack.bitAfterLast;
            subs.push(subPack);
            if (isLong) {
                length -= subPack.bitAfterLast;
            } else {
                length--;
            }
        }
        packet.bitAfterLast = substart;

        switch (packet.type) {
            case 0:
                packet.data = subs.reduce((total, curr) => total + curr.data, 0);
                break;
            case 1:
                packet.data = subs.reduce((total, curr) => total * curr.data, 1);
                break;
            case 2:
                packet.data = subs.sort((a, b) => a.data - b.data)[0].data;
                break;
            case 3:
                packet.data = subs.sort((a, b) => b.data - a.data)[0].data;
                break;
            case 5:
                packet.data = subs[0].data > subs[1].data ? 1 : 0;
                break;
            case 6:
                packet.data = subs[0].data < subs[1].data ? 1 : 0;
                break;
            case 7:
                packet.data = subs[0].data == subs[1].data ? 1 : 0;
                break;
        }
    }

    return packet;
};



module.exports = Run;
//Start timer
var startTime = new Date().getTime();
Run();
//End timer
var endTime = new Date().getTime();
var timeTaken = endTime - startTime;
console.log("Time taken: " + timeTaken + "ms");