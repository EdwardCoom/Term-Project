import * as THREE from 'three';
import {createChessEnvironment, initCanvasBasics, initLighting} from './initialization.js';
import { pickPiece, resetSelection } from './controls.js';

// Debug variables
var x = 0;
var y = 0;
var z = 0;
window.onload = function init()
{
    const [scene, renderer, camera, controls] = initCanvasBasics();
    const raycaster = new THREE.Raycaster();


    renderer.domElement.addEventListener('mousedown', (e) => {
        callSelection(e, raycaster, camera, scene);
    })

    renderer.domElement.addEventListener('mouseup', (e) => {
        if(x != camera.position.x || y != camera.position.y || z != camera.position.z) {
            [x, y, z] = [camera.position.x, camera.position.y, camera.position.z]
            console.log(`x: ${camera.position.x} y: ${camera.position.y} z: ${camera.position.z}`)
        }
    })

    controls.update();
    createChessEnvironment(scene)
    initLighting(scene, renderer);
    
    function animate() {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
    }
    animate();

    window.onresize = () => {
        renderAtScale(renderer, camera);
        
    }
}

function callSelection(e, raycaster, camera, scene) {
    if(e.button === 0) {
        pickPiece(e, raycaster, camera, scene)
    } else {
        resetSelection()
    }
}



