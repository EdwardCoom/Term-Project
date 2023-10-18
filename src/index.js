import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

window.onload = function init()
{
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    const loader = new GLTFLoader();

    loader.load( './models/chessboard.glb' , (gltf) => {
        scene.add(gltf.scene)
    }, undefined, (error) => {
        console.error(error);
    });

    renderer.render(scene, camera);
}
