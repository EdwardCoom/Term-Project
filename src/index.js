import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
window.onload = function init()
{
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 1 , 500);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    
    const loader = new GLTFLoader();

    loader.load( './models/chessboard.glb', (gltf) => {
        var board = gltf.scene;
        board.scale.set(0.25, 0.25, 0.25);
        board.rotation.x = 45
        board.position.set(0, 0, 0);
        scene.add(board);
    }, undefined, (error) => {
        console.error(error);
    });

    loader.load('./models/StylishDesk.glb', (gltf) => {
        var table = gltf.scene;
        table.scale.set(3, 0, 2);
        table.rotation.x = 45;
        table.position.set(0, 0, -3);
        scene.add(table);
    }, undefined, (error) => {
        console.error(error);
    })

    const AmbLight = new THREE.AmbientLight(0xffffff, 1);
    AmbLight.position.set(100);
    scene.add(AmbLight)
    
    const light = new THREE.DirectionalLight(0x00ffff, 1);
    light.position.set(15, 15, 0);
    light.target.position.set(0, 0, 0)
    scene.add(light)
    renderer.setClearColor(new THREE.Color(0xffffff), 1.0)
    
    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }
    animate();

}
