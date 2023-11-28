import * as THREE from 'three'
import {pieceArray } from './initialization';
import { checkValidMoves, findPieceSide, Turn} from './util';
import { Difficulty, Mode, requestBuilder, sendRequest } from './stockfish';

const allowedObjects = ['Pawn006', 'Rook004', 'Knight', 'bishop002', 'queeen', 'king000', 'Pawn005', 'Rook001', 'Knight003', 'bishop003', 'queeen001', 'king001']

//  [Move2, move3, move4, move5, move6] b6b5

var firstClick = false;
var pieceClicked = NaN;
var pieceClickedSquare = NaN;
var firstMoveOfGame = true;
let defaultBoardState = [];
var col, row;
var pieceMaterial = 0;
export var halfMoveClock = 0;
export var fullMoveClock = 1;
export var boardSpaceCoordinates = [
    [new THREE.Vector3(1.4, 0, 1.4), new THREE.Vector3(1.0, 0, 1.4), new THREE.Vector3(0.6, 0, 1.4), new THREE.Vector3(0.2, 0, 1.4), new THREE.Vector3(-0.2, 0, 1.4), new THREE.Vector3(-0.6, 0, 1.4), new THREE.Vector3(-1.0, 0, 1.4), new THREE.Vector3(-1.4, 0, 1.4)],
    [new THREE.Vector3(1.4, 0, 1.0), new THREE.Vector3(1.0, 0, 1.0), new THREE.Vector3(0.6, 0, 1.0), new THREE.Vector3(0.2, 0, 1.0), new THREE.Vector3(-0.2, 0, 1.0), new THREE.Vector3(-0.6, 0, 1.0), new THREE.Vector3(-1.0, 0, 1.0), new THREE.Vector3(-1.4, 0, 1.0)],
    [new THREE.Vector3(1.4, 0, 0.6), new THREE.Vector3(1.0, 0, 0.6), new THREE.Vector3(0.6, 0, 0.6), new THREE.Vector3(0.2, 0, 0.6), new THREE.Vector3(-0.2, 0, 0.6), new THREE.Vector3(-0.6, 0, 0.6), new THREE.Vector3(-1.0, 0, 0.6), new THREE.Vector3(-1.4, 0, 0.6)],
    [new THREE.Vector3(1.4, 0, 0.2), new THREE.Vector3(1.0, 0, 0.2), new THREE.Vector3(0.6, 0, 0.2), new THREE.Vector3(0.2, 0, 0.2), new THREE.Vector3(-0.2, 0, 0.2), new THREE.Vector3(-0.6, 0, 0.2), new THREE.Vector3(-1.0, 0, 0.2), new THREE.Vector3(-1.4, 0, 0.2)],
    [new THREE.Vector3(1.4, 0, -0.2), new THREE.Vector3(1.0, 0, -0.2), new THREE.Vector3(0.6, 0, -0.2), new THREE.Vector3(0.2, 0, -0.2), new THREE.Vector3(-0.2, 0, -0.2), new THREE.Vector3(-0.6, 0, -0.2), new THREE.Vector3(-1.0, 0, -0.2), new THREE.Vector3(-1.4, 0, -0.2)],
    [new THREE.Vector3(1.4, 0, -0.6), new THREE.Vector3(1.0, 0, -0.6), new THREE.Vector3(0.6, 0, -0.6), new THREE.Vector3(0.2, 0, -0.6), new THREE.Vector3(-0.2, 0, -0.6), new THREE.Vector3(-0.6, 0, -0.6), new THREE.Vector3(-1.0, 0, -0.6), new THREE.Vector3(-1.4, 0, -0.6)],
    [new THREE.Vector3(1.4, 0, -1.0), new THREE.Vector3(1.0, 0, -1.0), new THREE.Vector3(0.6, 0, -1.0), new THREE.Vector3(0.2, 0, -1.0), new THREE.Vector3(-0.2, 0, -1.0), new THREE.Vector3(-0.6, 0, -1.0), new THREE.Vector3(-1.0, 0, -1.0), new THREE.Vector3(-1.4, 0, -1.0)],
    [new THREE.Vector3(1.4, 0, -1.4), new THREE.Vector3(1.0, 0, -1.4), new THREE.Vector3(0.6, 0, -1.4), new THREE.Vector3(0.2, 0, -1.4), new THREE.Vector3(-0.2, 0, -1.4), new THREE.Vector3(-0.6, 0, -1.4), new THREE.Vector3(-1.0, 0, -1.4), new THREE.Vector3(-1.4, 0, -1.4)],
];
export var turn = Turn.WhiteTurn;
var validMoves = []

export function pickPiece(event, raycaster, camera, scene) {
    // start of the game version of the board
    if (firstMoveOfGame){
        defaultBoardState = pieceArray.slice();
        firstMoveOfGame = false;
    }
    var mouseX = ( event.clientX / window.innerWidth ) * 2 - 1;
    var mouseY = - ( event.clientY / window.innerHeight ) * 2 + 1;   

    //3. compute intersections
    if(firstClick == false) {
        raycaster.setFromCamera( new THREE.Vector2(mouseX, mouseY), camera ); 
        var intersects = raycaster.intersectObjects(scene.children, true)
        if(findPieceSide(intersects[0].object) != undefined && findPieceSide(intersects[0].object) == turn) {
            firstClick = true
            checkValidMoves(intersects[0].object, validMoves)
            //console.log(validMoves)
            //console.log(intersects[0].object); // Shows what object was clicked in console for debugging purposes
            if (allowedObjects.includes(intersects[0].object.name)) {  // checks to see if the intersected object is a chess piece
                try {
                    pieceMaterial = intersects[0].object.material.color.clone();
                    intersects[0].object.material.color.set(0x00CC00);
                    pieceClicked = intersects[0].object;
                    [col, row] = whichSquare(intersects[0].point)
                }
                catch (e) {
                    console.warn(e)
                }
            }
        }
    }
    else {
        
        firstClick = false;
        raycaster.setFromCamera( new THREE.Vector2(mouseX, mouseY), camera ); 
        var intersects = raycaster.intersectObjects(scene.children, true);
        //console.log(intersects[0].object); // Shows what object was clicked in console for debugging purposes
        var squareC = whichSquare(intersects[0].point);
         /* if(pieceArray[(8 * squareC[1]) + squareC[0]] == undefined) {            
            pieceArray[(8 * squareC[1]) + squareC[0]] = pieceClicked
            pieceArray[(8 * row) + col] = undefined
            worldVectorTranslate(boardSpaceCoordinates[squareC[0]][squareC[1]], pieceClicked);
            swapTurn()
        }
        else if (pieceArray[(8 * squareC[1]) + squareC[0]] != undefined && findPieceSide(pieceArray[(8 * squareC[1]) + squareC[0]]) != findPieceSide(pieceClicked)) {
            var temp = pieceArray[(8 * squareC[1]) + squareC[0]];
            //console.log(findPieceSide(pieceClicked))
            //console.log(findPieceSide(temp))
            // piece is moved to new spot in pieceArray
            pieceArray[(8 * squareC[1]) + squareC[0]] = pieceClicked;
            // Remove duplicate copy of now moved piece
            pieceArray[(8 * row) + col] = undefined;
            scene.remove(temp.parent);

            // remove taken piece from piece array
            //pieceArray[(8 * squareC[1]) + squareC[0]] = undefined;
            worldVectorTranslate(boardSpaceCoordinates[squareC[0]][squareC[1]], pieceClicked)
            console.log(temp.material)
            swapTurn()
        }  */
        // If you'd like to switch to previous implementation, uncomment block above and comment this line below
        makeMoveFromPiece(pieceClicked, squareC, row, col, scene);
        pieceClicked.material.color.set(pieceMaterial.getHex())
        //console.log(pieceArray)
        pieceClicked = NaN; // unselects piece after move
        var req = requestBuilder(createBoardStateArray(), turn, Difficulty.Easy, Mode.Move)
        sendRequest(req, scene)
    }
}

export function createBoardStateArray() {
    let boardState = [];
    for(const mesh of pieceArray) {
        if(mesh != undefined) {
            boardState.push(mesh.name);
        }
        else {
            boardState.push(undefined)
        }
    }
    return boardState.reverse()
}

export function swapTurn(updateHalfmove) {
    if(turn === Turn.WhiteTurn) {
        turn = Turn.BlackTurn
    }
    else {
        turn = Turn.WhiteTurn
        fullMoveClock += 1;
    }
    if (updateHalfmove) {
        halfMoveClock += 1;
    }
    else {
        halfMoveClock = 0;
    }

}

// logic for making a move seperated into its own function
// Makes relevant updates to the pieceArray
// squareC is the board location where the piece will move
// pieceClicked is the currently selected piece that will be moving
export function makeMoveFromPiece(pieceClicked, squareC, row, col, scene){
    console.log(pieceClicked);
    if(pieceArray[(8 * squareC[1]) + squareC[0]] == undefined) {            
        pieceArray[(8 * squareC[1]) + squareC[0]] = pieceClicked
        pieceArray[(8 * row) + col] = undefined

        // move pieces where needed from updated piecesArray
        renderFromBoardStateArray();

        swapTurn(true)
    }
    else if (pieceArray[(8 * squareC[1]) + squareC[0]] != undefined && findPieceSide(pieceArray[(8 * squareC[1]) + squareC[0]]) != findPieceSide(pieceClicked)) {
        var temp = pieceArray[(8 * squareC[1]) + squareC[0]];

        // piece is moved to new spot in pieceArray
        pieceArray[(8 * squareC[1]) + squareC[0]] = pieceClicked;

        // Remove duplicate copy of now moved piece
        pieceArray[(8 * row) + col] = undefined;
        scene.remove(temp.parent);

        // remove taken piece from piece array
        //pieceArray[(8 * squareC[1]) + squareC[0]] = undefined;

        // move pieces where needed from updated piecesArray
        renderFromBoardStateArray();

        swapTurn(false)
    }
}
// Makes a move from one space to another. Doesn't check if it's legal. Updates pieceArray accordingly
// this one is mainly for stockfish
// make sure not to try and use this simultaneously with the other movement function
function makeMoveFromBoard(fromSpace, toSpace, scene){
    // check if there is a piece at the location
    let pieceClicked = pieceArray[(8 * fromSpace[1]) + fromSpace[0]];
    //console.log(pieceClicked);
    if (pieceClicked != undefined){
        makeMoveFromPiece(pieceClicked, toSpace, fromSpace[1], fromSpace[0], scene);
    }
    else {//console.log("piecenotfound"); console.log(pieceClicked);
    }
}
// translates piece (a scene object) to newLoc (world coordinate Vector3)
// newLoc can be the point from a raycast, and piece can be pieceClicked
////////// Some notes for the sake of the group
            // matrixWorld is world coordinates, while matrix is local coordinates. index 12 is x, 13 is y, 14 is z
            // position.x is local coordinates
            // example of the pieces x coordinate in the world system
            // console.log(pieceClicked.matrixWorld[13]);
            // unfortunately, you can't seem to edit this directly, or our job would be easy. Let me know if you figure it out.
            // instead, I calculate the transformation in the world space and convert it to local space, then do a local space transformation.
export function worldVectorTranslate(newLoc, piece){
    var V = new THREE.Vector3(newLoc.x - piece.matrixWorld.elements[12], 0, newLoc.z - piece.matrixWorld.elements[14]);
    // 1 in local space is .25 in world space (at least on my computer. This may not be transferable)
    piece.position.x += V.x * 4;
    piece.position.z += V.z * 4;
}

// moves each piece to their appropriate position from the pieceArray (try to use this instead of calling worldVectorTranslate directly)
function renderFromBoardStateArray(){
    for (var i = 0; i < pieceArray.length; i++){
        if (pieceArray[i] != undefined){
            var space = [i % 8, Math.floor(i / 8)];
            worldVectorTranslate(boardSpaceCoordinates[space[0]][space[1]], pieceArray[i]);
        }
    }
}
// returns array location of chess square at location of vector in world space.
// Returns an array with the column, then row, as different values
// for example, the square b3 would return [1, 2]
export function whichSquare(V){
    // how far within the square you have to click
    var epsilon = .01;
    var row, col;
    // check if within bounds of board. If not, return NaN (-1?)
    if (V.x > 1.65 || V.x < -1.65 || V.z > 1.65 || V.z < -1.65){
        return [-1. -1];
    }

    // find column
    if (V.z > 1.2 + epsilon){
        col = 0;
    }
    else if (V.z > .8 + epsilon){
        col = 1;
    }
    else if (V.z > .4 + epsilon){
        col = 2;
    }
    else if (V.z > 0 + epsilon){
        col = 3;
    }
    else if (V.z > -.4 + epsilon){
        col = 4;
    }
    else if (V.z > -.8 + epsilon){
        col = 5;
    }
    else if (V.z > -1.2 + epsilon){
        col = 6;
    }
    else 
        col = 7;

    // find row
    if (V.x > 1.2 + epsilon){
        row = 0;
    }
    else if (V.x > .8 + epsilon){
        row = 1;
    }
    else if (V.x > .4 + epsilon){
        row = 2;
    }
    else if (V.x > 0 + epsilon){
        row = 3;
    }
    else if (V.x > -.4 + epsilon){
        row = 4;
    }
    else if (V.x > -.8 + epsilon){
        row = 5;
    }
    else if (V.x > -1.2 + epsilon){
        row = 6;
    }
    else 
        row = 7;

    return [col, row];
}
export function resetSelection() {
    firstClick = !firstClick
    try {
        pieceClicked.material.color.set(pieceMaterial.getHex())
    }
    catch (e){
        console.warn(e)
    }
}