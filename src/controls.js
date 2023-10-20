
import * as THREE from 'three'

export function pickPiece(event, raycaster, camera, scene) {
    var mouseX = ( event.clientX / window.innerWidth ) * 2 - 1;
    var mouseY = - ( event.clientY / window.innerHeight ) * 2 + 1;

//2. set the picking ray from the camera position and mouse coordinates
    raycaster.setFromCamera( new THREE.Vector2(mouseX, mouseY), camera );    

//3. compute intersections
    var intersects = raycaster.intersectObjects(scene.children, true)
    try {
        intersects[0].object.material.color.set(0x00CC00)
    }
    catch (e) {
        console.warn(e)
    }
}