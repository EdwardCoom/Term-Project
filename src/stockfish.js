import { fullMoveClock, halfMoveClock, worldVectorTranslate, boardSpaceCoordinates, swapTurn, makeMoveFromPiece, renderFromBoardStateArray, turn, changeClock, removeFromTaken, undoBoardState} from "./controls";
import { pieceArray } from "./initialization";
import {Turn, findPieceSide} from './util'

const address = "https://stockfish.online/api/stockfish.php?fen=";
const pieceMap = new Map([
    ['Pawn005', 'P'],
    ['Knight003', 'N'],
    ['bishop003', 'B'],
    ['Rook001', 'R'],
    ['queeen001', 'Q'],
    ['king001', 'K'],
    ['Pawn006', 'p'],
    ['Rook004', 'r'],
    ['Knight', 'n'],
    ['bishop002', 'b'],
    ['queeen', 'q'],
    ['king000', 'k']
]);

export class Square {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}

export class Move {
    constructor(start, end, halfMoveClock, fullMoveClock, pieceTaken = undefined) {
        this.start = start;
        this.end = end;
        this.pieceTaken = pieceTaken;
        this.halfMoveClock = halfMoveClock;
        this.fullMoveClock = fullMoveClock;
    }

    undo() {
        undoBoardState(this.start, this.end, this.pieceTaken)
        changeClock(this.fullMoveClock, this.halfMoveClock)
        swapTurn(false)
        removeFromTaken(this.pieceTaken)
        renderFromBoardStateArray();
        console.log(pieceArray)
    }
}

// FENString example fen= "r2q1rk1/ppp2ppp/3bbn2/3p4/8/1B1P4/PPP2PPP/RNB1QRK1 w - - 5 11"
export const Difficulty = Object.freeze({
    Easy: 1, 
    Medium: 3,
    Hard: 10,
}) // 5 is about 1800 elo. 10 is 2231. See https://web.ist.utl.pt/diogo.ferreira/papers/ferreira13impact.pdf

export const Mode = Object.freeze({
    Eval: "eval",
    Move: "bestmove",
    lines: "lines",
})

export function requestBuilder(boardState, turn, diff, mode) {
    const fenstring = FENString(boardState, turn);
    return request(fenstring, diff, mode)
}

export function sendRequest(Request, scene) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", Request)
    xhr.send()
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = xhr.response.data
            stockfishMove(data, scene)
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    }
    //find a way to request stockfish.online

}

function stockfishMove(data, scene) {
    let [start, end] = parseData(data)
    console.log(`Square row: ${end.row}, Square col: ${end.col}`)
    /*if(pieceArray[(8 * end.row) + end.col] == undefined) {
        console.log(end)            
        pieceArray[(8 * end.row) + end.col] = pieceArray[(8 * start.row) + start.col]
        console.log(pieceArray)
        worldVectorTranslate(boardSpaceCoordinates[end.col][end.row], pieceArray[(8 * start.row) + start.col]);
        pieceArray[(8 * start.row) + start.col] = undefined
        swapTurn(true)
    }
    else if (pieceArray[(8 * end.row) + end.col] != undefined && findPieceSide(pieceArray[(8 * end.row) + end.col] ) != findPieceSide(pieceArray[(8 * start.row) + start.col] )) {
        var temp = pieceArray[(8 * end.row) + end.col];
        pieceArray[(8 * end.row) + end.col] = pieceArray[(8 * start.row) + start.col]
        worldVectorTranslate(boardSpaceCoordinates[end.col][end.row], pieceArray[(8 * start.row) + start.col]);
        pieceArray[(8 * start.row) + start.col] = undefined
        scene.remove(temp.parent);
        swapTurn(false)
        console.log(pieceArray)
    }*/
    makeMoveFromPiece(pieceArray[8 * start.row + start.col], [end.col, end.row], start.row, start.col, scene);
}

function parseData(data) {
    data.toString()
    data = data.substr(data.indexOf(' '))
    data = data.trimStart()
    data = Array.from(data)
    let startSquare = new Square(Number(data[1]) - 1, Number(data[0].charCodeAt(0)) - Number('a'.charCodeAt(0)))
    let endSquare = new Square(Number(data[3]) - 1, Number(data[2].charCodeAt(0)) - Number('a'.charCodeAt(0)))
    return [startSquare, endSquare]
}

function FENString(boardState, turn) {  // Takes in 2D array of the board and outputs FENString. Example at the start of the file.
    let fen = ''
    let offset = 0;
    let index = 0;
    for(const string of boardState) {
        if(string != undefined) {
            if(offset != 0) {
                fen += offset.toString();
                offset = 0
            }
            fen += pieceMap.get(string)
        }
        else {
            offset += 1
        }
        if (index % 8 == 7 && offset == 0) {
            fen += '/'
        }
        else if(index % 8 == 7) {
            fen += offset.toString() + '/'
            offset = 0
        }
        index += 1;
    }
    let fenarr = fen.split('/')
    fen = ''
    for(let i = 0; i < fenarr.length; i++) {
        fenarr[i] = Array.from(fenarr[i])
        fenarr[i].reverse().join('')
        fen += fenarr[i]
        fen += '/'
    }
    fen = fen.replaceAll(',', '')
    fen = fen.slice(0, fen.length - 2)
    // Shows turn
    fen += '%20b%20'
    fen += '-%20-%20'
    fen += halfMoveClock.toString() + '%20'
    fen += fullMoveClock.toString()

    return fen
}

function request(FENString, diff, mode) {
    return address + FENString + "&depth=" + diff + "&mode=" + mode;
}

