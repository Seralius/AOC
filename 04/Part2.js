const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')
input = input.split("\r\n");
input = input.filter(function (e) { return e != '' });
function Run() {
    var Nums = input[0].split(",").map(Number);
    var DrawnNumbers = 0;
    var BingoBoards = [];
    for (let i = 1; i < input.length; i++) {
        const element = input[i];
        var IterNum = i - 1;
        BingoBoards[parseInt(IterNum / 5)] = BingoBoards[parseInt(IterNum / 5)] || [];
        var RowNums = element.match(/\d+/g)
        var BingoRow = []
        for (let i = 0; i < 5; i++) {
            const element = RowNums[i];
            BingoRow[i] = {
                Num: parseInt(element),
                drawn: false
            }
        }
        BingoBoards[parseInt(IterNum / 5)].push(BingoRow);
    }

    function Draw() {
        DrawnNumbers++;
        let DrawnNum = Nums[DrawnNumbers - 1];
        BingoBoards.forEach(Board => {
            Board.forEach(row => {
                row.forEach(BingoNum => {
                    if (BingoNum.Num == DrawnNum) {
                        BingoNum.drawn = true
                    }
                });
            });
        });
    }
    function CheckForWinning() {
        //Check if Bingo Bord is full either by row or by lane
        var WinningBoards = [];
        BingoBoards.forEach(Board => {
            var WinningBoard = false;
            Board.forEach(row => {
                if (!WinningBoard) {
                    WinningBoard = CheckRow(row)
                }
            })
            for (let i = 0; i < 5; i++) {
                if (!WinningBoard) {
                    WinningBoard = CheckRow([Board[0][i], Board[1][i], Board[2][i], Board[3][i], Board[4][i]])
                }
            }
            if (WinningBoard) {
                WinningBoards.push(Board);
            }
        })
        return WinningBoards;
    }

    function CheckRow(Row) {
        var allTrue = true;
        Row.forEach(BingoNum => {
            if (allTrue) {
                allTrue = BingoNum.drawn;
            }
        })
        return allTrue;
    }
    var WinningBoards = [];
    var Check = CheckForWinning();
    while (WinningBoards.length < BingoBoards.length) {
        Draw();
        Check = CheckForWinning();
        if (Check.length > 0) {
            Check.forEach(Board => {
                if (WinningBoards.indexOf(Board) == -1) {
                    WinningBoards.push(Board);
                }
            });
        }
    }
    var Multiplier = Nums[DrawnNumbers - 1];
    var SumofWinningBoard = 0;
    WinningBoards[WinningBoards.length - 1].forEach(row => {
        row.forEach(BingoNum => {
            if (!BingoNum.drawn) {
                SumofWinningBoard += BingoNum.Num;
            }
        });
    });
    console.log(SumofWinningBoard * Multiplier);
}
module.exports = Run;
Run();