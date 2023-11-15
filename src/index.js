import * as THREE from 'three';
import {createChessEnvironment, initCanvasBasics, initLighting} from './initialization.js';
import { pickPiece, resetSelection } from './controls.js';
import {renderAtScale} from './util.js';

// Debug variables
var x = 0;
var y = 0;
var z = 0;


window.onload = function init()
{
    const [scene, renderer, camera, controls] = initCanvasBasics();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.needsUpdate = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    document.body.appendChild(renderer.domElement);



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


    const AmbLight = new THREE.AmbientLight(0xffffff, 1.5);
    AmbLight.position.set(100);
    scene.add(AmbLight)
    
    const light = new THREE.SpotLight(0xE8DB9F, 100);
    light.castShadow = true;
    light.position.set(0, 13, 0.25);
    light.target.position.set(0, 0, 0)
    scene.add(light)
    renderer.setClearColor(new THREE.Color(0xffffff), 1.0)
    

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



