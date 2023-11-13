import * as THREE from 'three'
import { Object3D } from 'three';

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
            intersects[0].object.material.color.set(0x00CC00);
            pieceClicked = intersects[0].object;

        }
        catch (e) {
            console.warn(e)
        }
    }
    else {
        firstClick = false;
        raycaster.setFromCamera( new THREE.Vector2(mouseX, mouseY), camera ); 
        var intersects = raycaster.intersectObjects(scene.children, true);
        try {
            pieceClicked.material.color.set(pieceMaterial.getHex())

            // matrixWorld is world coordinates, while matrix is local coordinates. index 12 is x, 13 is y, 14 is z
            // position.x is local coordinates
            // example of the pieces x coordinate in the world system
            // console.log(pieceClicked.matrixWorld[13]);
            // unfortunately, you can't seem to edit this directly, or our job would be easy. Let me know if you figure it out.
            // instead, I calculate the transformation in the world space and convert it to local space, then do a local space transformation.

            // world space vector transformation from piece location to new world location
            var V = new THREE.Vector3(intersects[0].point.x - pieceClicked.matrixWorld.elements[12], 0, intersects[0].point.z - pieceClicked.matrixWorld.elements[14]);
            
            // 1 in local space is .25 in world space (at least on my computer. This may not be transferable)
            pieceClicked.position.x += V.x * 4;
            pieceClicked.position.z += V.z * 4;
 
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