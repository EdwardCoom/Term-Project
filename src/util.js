import { whichSquare } from "./controls";
import { pieceArray } from "./initialization";

export function findPieceSide(Piece) {
    return pieceSideMap.get(Piece.name)
}

export const Side = Object.freeze({
    White: 1,
    Black: -1,
})

export const Turn = Object.freeze({
    WhiteTurn: 1,
    BlackTurn: -1,
})

const pieceType = Object.freeze({
    Pawn: 1,
    Knight: 3,
    Bishop: 3,
    Rook: 5,
    Queen: 9,
    King: 0,
})

export const pieceSideMap = new Map([
    ['Pawn005', Side.White],
    ['Knight003', Side.White],
    ['bishop003', Side.White],
    ['Rook001', Side.White],
    ['queeen001', Side.White],
    ['king001', Side.White],
    ['Pawn006', Side.Black],
    ['Rook004', Side.Black],
    ['Knight', Side.Black],
    ['bishop002', Side.Black],
    ['queeen', Side.Black],
    ['king000', Side.Black]
]);

const pieceTypeMap = new Map([
    ['Pawn005', pieceType.Pawn],
    ['Knight003', pieceType.Knight],
    ['bishop003', pieceType.Bishop],
    ['Rook001', pieceType.Rook],
    ['queeen001', pieceType.Queen],
    ['king001', pieceType.King],
    ['Pawn006', pieceType.Pawn],
    ['Rook004', pieceType.Rook],
    ['Knight', pieceType.Knight],
    ['bishop002', pieceType.Bishop],
    ['queeen', pieceType.Queen],
    ['king000', pieceType.King]
])

export function renderAtScale(renderer, camera) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}


export function checkValidMoves(piece, array) {
    var type = pieceTypeMap.get(piece.name)
    var [col, row] = whichSquare(piece.position)
    switch (type) {
        /*case pieceType.Pawn:
            pawnValidMoves(col, row, array);
            break;
        case pieceType.Knight:
            knightValidMoves(col, row, array);
            break;
        case pieceType.Bishop:
            bishopValidMoves(col, row, array);
            break;
        case pieceType.Rook:
            rookValidMoves(col, row, array);
            break;
        case pieceType.Queen:
            queenValidMoves(col, row, array);
            break;*/
        case pieceType.King:
            kingValidMoves(piece, col, row, array);
            break;
    }
}

function kingValidMoves(piece, col, row, validMovesArr) {
    checkSquare(piece, col + 1, row, validMovesArr)
    checkSquare(piece, col - 1, row, validMovesArr)
    checkSquare(piece, col, row + 1, validMovesArr)
    checkSquare(piece, col, row - 1, validMovesArr)
}

function checkSquare(piece, col, row, validMovesArr) {
    if(col < 8 && col >= 0 && row < 8 && row >= 0) {
        if(pieceArray[row * 8 + col] == undefined || findPieceSide(pieceArray[row * 8 + col]) != findPieceSide(piece)) {
            validMovesArr.push([col, row])
        }
    }
}