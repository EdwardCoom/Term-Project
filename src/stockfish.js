const address = "https://stockfish.online/api/stockfish.php";
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

export function requestBuilder(boardState, diff, mode) {
    const fenstring = FENString(boardState);
    return request(fenstring, diff, mode)
}

export function sendRequest(Request) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "")
    xhr.send()
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.response)
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    }
    //find a way to request stockfish.online

}

function FENString(boardState) { // Takes in 2D array of the board and outputs FENString. Example at the start of the file.
    return boardState;
}

function request(FENString, diff, mode) {
    return address + FENString + "&depth=" + diff + "&mode=" + mode;
}
