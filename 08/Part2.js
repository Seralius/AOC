const fs = require('fs')

var Rawinput = fs.readFileSync("input.txt").toString('utf-8')
input = Rawinput.split("\r\n");
function Run() {
    var DecodedSegmentSet = [
        "abcefg",
        "cf",
        "acdeg",
        "acdfg",
        "bcdf",
        "abdfg",
        "abdefg",
        "acf",
        "abcdefg",
        "abcdfg"
    ]
    var Sum = 0;
    input.forEach(Segments => {
        var NumericSegments = Segments.split(" | ")[0].match(/\w+/g)
        var DecodedNums = []
        NumericSegments.forEach(Segment => {
            DecodedNums.push({
                Segment: Segment.split("").sort().join(""),
                Value: Segment.length == 2 ? 1 :
                    Segment.length == 3 ? 7 :
                        Segment.length == 4 ? 4 :
                            Segment.length == 7 ? 8 : -1
            })
        })
        var TranslationSet = {
            a: "abcdefg",
            b: "abcdefg",
            c: "abcdefg",
            d: "abcdefg",
            e: "abcdefg",
            f: "abcdefg",
            g: "abcdefg",
        }
        var UnoccupiedNums = "0123456789"
        DecodedNums.forEach(Segment => {
            if (Segment.Value != -1) {
                UnoccupiedNums = UnoccupiedNums.replace(Segment.Value, "")
                var RegString = "[^" + Segment.Segment + "]"
                var Reg = new RegExp(RegString, "g")
                switch (Segment.Segment.length) {
                    case 2:
                        TranslationSet.c = TranslationSet.c.replace(Reg, "")
                        TranslationSet.f = TranslationSet.f.replace(Reg, "")
                        break;
                    case 3:
                        var RegString = "[^" + Segment.Segment + "]"
                        TranslationSet.a = TranslationSet.a.replace(Reg, "")
                        TranslationSet.c = TranslationSet.c.replace(Reg, "")
                        TranslationSet.f = TranslationSet.f.replace(Reg, "")
                        break;
                    case 4:
                        var RegString = "[^" + Segment.Segment + "]"
                        TranslationSet.b = TranslationSet.b.replace(Reg, "")
                        TranslationSet.c = TranslationSet.c.replace(Reg, "")
                        TranslationSet.d = TranslationSet.d.replace(Reg, "")
                        TranslationSet.f = TranslationSet.f.replace(Reg, "")
                }
            }
        })
        if (TranslationSet.c.length == 2 && TranslationSet.f == TranslationSet.c) {
            var Reg = new RegExp("[" + TranslationSet.c + TranslationSet.f + "]", "g")
            "abdeg".split("").forEach(Letter => { TranslationSet[Letter] = TranslationSet[Letter].replace(Reg, "") })
        }
        if (TranslationSet.b.length == 2 && TranslationSet.b == TranslationSet.d) {
            var Reg = new RegExp("[" + TranslationSet.b + TranslationSet.d + "]", "g")
            "acfeg".split("").forEach(Letter => { TranslationSet[Letter] = TranslationSet[Letter].replace(Reg, "") })
        }
        TranslationSet.e = TranslationSet.e.replace(TranslationSet.a, "")
        TranslationSet.g = TranslationSet.g.replace(TranslationSet.a, "")
        var AllSets = []
        for (let bd = 0; bd < 2; bd++) {
            for (let cf = 0; cf < 2; cf++) {
                for (let eg = 0; eg < 2; eg++) {
                    AllSets.push({
                        a: TranslationSet.a,
                        b: TranslationSet.b[bd],
                        c: TranslationSet.c[cf],
                        d: TranslationSet.d[bd == 0 ? 1 : 0],
                        e: TranslationSet.e[eg],
                        f: TranslationSet.f[cf == 0 ? 1 : 0],
                        g: TranslationSet.g[eg == 0 ? 1 : 0]
                    })
                }
            }
        }
        var Already = false;
        AllSets.forEach(Set => {
            var ValidCombs = []
            ValidCombs[1] = DecodedNums.filter(S => S.Value == 1)[0].Segment
            ValidCombs[4] = DecodedNums.filter(S => S.Value == 4)[0].Segment
            ValidCombs[7] = DecodedNums.filter(S => S.Value == 7)[0].Segment
            ValidCombs[8] = DecodedNums.filter(S => S.Value == 8)[0].Segment
            UnoccupiedNums.split("").forEach(Num => {
                Num = parseInt(Num)
                var NeededSegments = DecodedSegmentSet[Num]
                var SegmentString = "";
                NeededSegments.split("").forEach(Segment => {
                    SegmentString += SegmentString.includes(Set[Segment]) ? "" : Set[Segment]
                })
                if (NeededSegments.length == SegmentString.length) {
                    ValidCombs[Num] = SegmentString.split("").sort().join("")
                }
            })
            if (ValidCombs.length == 10) {
                var NeededSegments = Segments.split(" | ")[1].match(/\w+/g);
                var Output = "";
                NeededSegments.forEach(Segment => {
                    if(ValidCombs.includes(Segment.split("").sort().join(""))){
                        Output += ValidCombs.indexOf(Segment.split("").sort().join(""))
                    }
                })
                if (Output.length == NeededSegments.length && !Already) {
                    console.log("Valid Set found!")
                    console.log(Output)
                    Sum += parseInt(Output)
                    Already = true
                }
            }
        })
    });
    console.log(Sum)
}
module.exports = Run;
//Start timer
var startTime = new Date().getTime();
Run();
//End timer
var endTime = new Date().getTime();
var timeTaken = endTime - startTime;
console.log("Time taken: " + timeTaken + "ms");