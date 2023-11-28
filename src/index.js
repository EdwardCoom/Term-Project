import * as THREE from 'three';
import {createChessEnvironment, initCanvasBasics, initLighting} from './initialization.js';
import { pickPiece, resetSelection, turn } from './controls.js';
import {renderAtScale} from './util.js';

// Debug variables
var x = 0;
var y = 0;
var z = 0;

// Camera View Variable
var turnBased = false;


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

        console.log(turn)
        if(turnBased)
        turnBasedCam(turn)
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

    document.getElementById("FLook").onclick = function() { 
        turnBased = false;
        controls.enabled = true;
        controls.update();
    }

    document.getElementById("TBased").onclick = function() {
        turnBased = true;
        controls.enabled = false;
        turnBasedCam(turn)
    
    }
    document.getElementById("White").onclick = function() {
        turnBased = false;
        controls.enabled = false;
        camera.position.set(1.5736608853190526, 4.977554559408481, 0.006482756258023483);
        camera.lookAt(0, 0, 0);
    }

    document.getElementById("Black").onclick = function() {
        turnBased = false;
        controls.enabled = false;
        camera.position.set(-2.003134992867659, 4.820781969087748, -0.003377405452138519);
        camera.lookAt(0, 0, 0);
    }

    document.getElementById("Side").onclick = function() {
        turnBased = false;
        controls.enabled = false;
        camera.position.set(1.259335725318013, 6.1517165739009805, 7.341964614747079);
        camera.lookAt(0, 0, 0);
    }

    document.getElementById("UndoMove").onclick = function() {}  /// TODO

    document.getElementById("NewGame").onclick = function() {window.location.reload();}
    
    function turnBasedCam(turn) {
        if (turn === 1) {
            camera.position.set(1.5736608853190526, 4.977554559408481, 0.006482756258023483);
            camera.lookAt(0, 0, 0);
        }
        else if (turn === -1 ) {
            camera.position.set(-2.003134992867659, 4.820781969087748, -0.003377405452138519);
            camera.lookAt(0, 0, 0);
        }
    }

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

