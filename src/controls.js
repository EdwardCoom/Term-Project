import * as THREE from 'three'
import { Object3D } from 'three';

const allowedObjects = ['Pawn006', 'Rook004', 'Knight', 'bishop002', 'queeen', 'king000', 'Pawn005', 'Rook001', 'Knight003', 'bishop003', 'queeen001', 'king001']

var firstClick = false;
var pieceClicked = NaN;
var pieceMaterial = 0;
var boardSpaceCoordinates = [
    [new THREE.Vector3(1.4, 0, 1.4), new THREE.Vector3(1.0, 0, 1.4), new THREE.Vector3(0.6, 0, 1.4), new THREE.Vector3(0.2, 0, 1.4), new THREE.Vector3(-0.2, 0, 1.4), new THREE.Vector3(-0.6, 0, 1.4), new THREE.Vector3(-1.0, 0, 1.4), new THREE.Vector3(-1.4, 0, 1.4)],
    [new THREE.Vector3(1.4, 0, 1.0), new THREE.Vector3(1.0, 0, 1.0), new THREE.Vector3(0.6, 0, 1.0), new THREE.Vector3(0.2, 0, 1.0), new THREE.Vector3(-0.2, 0, 1.0), new THREE.Vector3(-0.6, 0, 1.0), new THREE.Vector3(-1.0, 0, 1.0), new THREE.Vector3(-1.4, 0, 1.0)],
    [new THREE.Vector3(1.4, 0, 0.6), new THREE.Vector3(1.0, 0, 0.6), new THREE.Vector3(0.6, 0, 0.6), new THREE.Vector3(0.2, 0, 0.6), new THREE.Vector3(-0.2, 0, 0.6), new THREE.Vector3(-0.6, 0, 0.6), new THREE.Vector3(-1.0, 0, 0.6), new THREE.Vector3(-1.4, 0, 0.6)],
    [new THREE.Vector3(1.4, 0, 0.2), new THREE.Vector3(1.0, 0, 0.2), new THREE.Vector3(0.6, 0, 0.2), new THREE.Vector3(0.2, 0, 0.2), new THREE.Vector3(-0.2, 0, 0.2), new THREE.Vector3(-0.6, 0, 0.2), new THREE.Vector3(-1.0, 0, 0.2), new THREE.Vector3(-1.4, 0, 0.2)],
    [new THREE.Vector3(1.4, 0, -0.2), new THREE.Vector3(1.0, 0, -0.2), new THREE.Vector3(0.6, 0, -0.2), new THREE.Vector3(0.2, 0, -0.2), new THREE.Vector3(-0.2, 0, -0.2), new THREE.Vector3(-0.6, 0, -0.2), new THREE.Vector3(-1.0, 0, -0.2), new THREE.Vector3(-1.4, 0, -0.2)],
    [new THREE.Vector3(1.4, 0, -0.6), new THREE.Vector3(1.0, 0, -0.6), new THREE.Vector3(0.6, 0, -0.6), new THREE.Vector3(0.2, 0, -0.6), new THREE.Vector3(-0.2, 0, -0.6), new THREE.Vector3(-0.6, 0, -0.6), new THREE.Vector3(-1.0, 0, -0.6), new THREE.Vector3(-1.4, 0, -0.6)],
    [new THREE.Vector3(1.4, 0, -1.0), new THREE.Vector3(1.0, 0, -1.0), new THREE.Vector3(0.6, 0, -1.0), new THREE.Vector3(0.2, 0, -1.0), new THREE.Vector3(-0.2, 0, -1.0), new THREE.Vector3(-0.6, 0, -1.0), new THREE.Vector3(-1.0, 0, -1.0), new THREE.Vector3(-1.4, 0, -1.0)],
    [new THREE.Vector3(1.4, 0, -1.4), new THREE.Vector3(1.0, 0, -1.4), new THREE.Vector3(0.6, 0, -1.4), new THREE.Vector3(0.2, 0, -1.4), new THREE.Vector3(-0.2, 0, -1.4), new THREE.Vector3(-0.6, 0, -1.4), new THREE.Vector3(-1.0, 0, -1.4), new THREE.Vector3(-1.4, 0, -1.4)],
];

export function pickPiece(event, raycaster, camera, scene) {
    var mouseX = ( event.clientX / window.innerWidth ) * 2 - 1;
    var mouseY = - ( event.clientY / window.innerHeight ) * 2 + 1;   

    //3. compute intersections
    if(!firstClick) {
        firstClick = true
        raycaster.setFromCamera( new THREE.Vector2(mouseX, mouseY), camera ); 
        var intersects = raycaster.intersectObjects(scene.children, true)
        console.log(intersects[0].object); // Shows what object was clicked in console for debugging purposes

        if (allowedObjects.includes(intersects[0].object.name)) {
            try {
                pieceMaterial = intersects[0].object.material.color.clone();
                intersects[0].object.material.color.set(0x00CC00);
                pieceClicked = intersects[0].object;

            }
            catch (e) {
                console.warn(e)
            }
        }
    }
    else {
        firstClick = false;
        raycaster.setFromCamera( new THREE.Vector2(mouseX, mouseY), camera ); 
        var intersects = raycaster.intersectObjects(scene.children, true);
        console.log(intersects[0].object); // Shows what object was clicked in console for debugging purposes
        
        if (allowedObjects.includes(intersects[0].object.name)) {
            try {
                pieceClicked.material.color.set(pieceMaterial.getHex())

                
    
            }
            catch (e) {
                console.warn(e)
            }
        }
        var squareC = whichSquare(intersects[0].point);
        worldVectorTranslate(boardSpaceCoordinates[squareC[0]][squareC[1]], pieceClicked);
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
function worldVectorTranslate(newLoc, piece){
    var V = new THREE.Vector3(newLoc.x - piece.matrixWorld.elements[12], 0, newLoc.z - piece.matrixWorld.elements[14]);
    // 1 in local space is .25 in world space (at least on my computer. This may not be transferable)
    piece.position.x += V.x * 4;
    piece.position.z += V.z * 4;
}

// returns array location of chess square at location of vector in world space.
// Returns an array with the column, then row, as different values
// for example, the square b3 would return [1, 2]
function whichSquare(V){
    // how far past the line you have to click
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
    pieceClicked.material.color.set(pieceMaterial.getHex())
}