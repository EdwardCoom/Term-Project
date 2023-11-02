import * as THREE from 'three'

var firstClick = false;
var pieceClicked = NaN;
var pieceMaterial = 0;

export function pickPiece(event, raycaster, camera, scene) {
    var mouseX = ( event.clientX / window.innerWidth ) * 2 - 1;
    var mouseY = - ( event.clientY / window.innerHeight ) * 2 + 1;   

    //3. compute intersections
    if(!firstClick) {
        firstClick = true
        raycaster.setFromCamera( new THREE.Vector2(mouseX, mouseY), camera ); 
        var intersects = raycaster.intersectObjects(scene.children, true)
        try {
            pieceMaterial = intersects[0].object.material.color.clone();
            intersects[0].object.material.color.set(0x00CC00)
            pieceClicked = intersects[0].object
        }
        catch (e) {
            console.warn(e)
        }
    }
    else {
        firstClick = false;
        raycaster.setFromCamera( new THREE.Vector2(mouseX, mouseY), camera ); 
        var intersects = raycaster.intersectObjects(scene.children, true)
        try {
            pieceClicked.material.color.set(pieceMaterial.getHex())
            console.log(intersects[0].point)
            // Need to find a way to change position correctly.
        }
        catch (e) {
            console.warn(e)
        }
    }
}

export function resetSelection() {
    firstClick = !firstClick
    pieceClicked.material.color.set(pieceMaterial.getHex())
}