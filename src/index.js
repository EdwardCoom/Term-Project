import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {createChessEnvironment} from './initalization.js';
window.onload = function init()
{
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.needsUpdate = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    document.body.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 1 , 500);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls( camera, renderer.domElement);
    controls.update();

    const scene = new THREE.Scene();
    
    const loader = new GLTFLoader();
    
    createChessEnvironment(scene)

    const AmbLight = new THREE.AmbientLight(0xffffff, 1);
    AmbLight.position.set(100);
    scene.add(AmbLight)
    
    const light = new THREE.SpotLight(0xE8DB9F, 20);
    light.castShadow = true;
    light.position.set(0, 3, 0.25);
    light.target.position.set(0, 0, 0)
    scene.add(light)
    renderer.setClearColor(new THREE.Color(0xffffff), 1.0)
    
    function animate() {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
    }
    animate();

    window.onresize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
    }
}



