import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
window.onload = function init()
{
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 1 , 500);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls( camera, renderer.domElement);
    controls.update();

    const scene = new THREE.Scene();
    
    const loader = new GLTFLoader();

    loader.load( './models/chess.glb', (gltf) => {
        var board = gltf.scene;
        board.scale.set(0.25, 0.25, 0.25);
        board.rotation.x = 0
        board.position.set(0, 0, 0);
        scene.add(board);
    }, undefined, (error) => {
        console.error(error);
    });

    loader.load('./models/StylishDesk.glb', (gltf) => {
        var table = gltf.scene;
        table.scale.set(3, 0, 2);
        table.rotation.x = 0;
        table.position.set(0, -0.22, 0);
        scene.add(table);
    }, undefined, (error) => {
        console.error(error);
    })
    
    loader.load('./models/white_pawn.glb', (gltf) => {
        var pawn = gltf.scene;
        pawn.scale.set(0.25, 0.25, 0.25);
        pawn.position.set(0, 0, 0);
        scene.add(pawn);
    }, undefined, (error) => {
        console.error(error);
    });

    const AmbLight = new THREE.AmbientLight(0xffffff, 1);
    AmbLight.position.set(100);
    scene.add(AmbLight)
    
    const light = new THREE.SpotLight(0xE8DB9F, 10);
    light.position.set(0, 2, 0);
    light.target.position.set(0, 0, 0)
    scene.add(light)
    renderer.setClearColor(new THREE.Color(0xffffff), 1.0)
    
    function animate() {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
    }
    animate();

}
