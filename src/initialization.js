/* Each square on the board seems to be 0.4 in length and width.
 * Later, the algorithms below will use this to determine the place
 * of the piece on the board
 */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {Difficulty, Mode, requestBuilder, sendRequest} from './stockfish.js'
import {turn} from './controls.js'

const pieceScale = 0.25
const squareSize = 0.4
export var pieceArray = []


export function createChessEnvironment(scene) {
  var loader = new GLTFLoader();
  createRoom(scene, loader)
  createBoard(scene, loader)
  initializeArray(pieceArray)
  //createTable(scene, loader)
  createWhitePieces(scene, loader)
  createBlackPieces(scene, loader)
  console.log(pieceArray)
  var res = requestBuilder(pieceArray, turn, Difficulty.Easy, Mode.Move) // running into problems transferring data.
  console.log(res);
}

function createRoom(scene, loader) {
  loader.load('./models/polyroom.glb', (gltf) => {
    var room = gltf.scene;
    room.scale.set(2, 2, 2);
    room.position.set(1, -2.71, -1.1);
    scene.add(room);
  }, undefined, (error) => {
    console.error(error)
  })
}

export function initCanvasBasics() {
  const scene = new THREE.Scene();
  const renderer = initRenderer();
  const camera = initCamera();
  const controls = new OrbitControls( camera, renderer.domElement);
  return [scene, renderer, camera, controls]
}

export function initLighting(scene, renderer) {
  const AmbLight = new THREE.AmbientLight(0xffffff, 1);
  AmbLight.position.set(100);
  scene.add(AmbLight)
  
  const light = new THREE.SpotLight(0xE8DB9F, 20);
  light.castShadow = true;
  light.position.set(0, 3, 0.25);
  light.target.position.set(0, 0, 0)
  scene.add(light)
  renderer.setClearColor(new THREE.Color(0xffffff), 1.0)

  //Another Light Option
  const dlight = new THREE.DirectionalLight(0xffffff, 1);
  dlight.position.set(-30, 50, -30);
  dlight.castShadow = true;
  dlight.shadow.mapSize.width = 2048;
  dlight.shadow.mapSize.height = 2048;
  dlight.shadow.camera.left = -70;
  dlight.shadow.camera.right = 70;
  dlight.shadow.camera.top = 70;
  dlight.shadow.camera.bottom = -70;
  scene.add(dlight);
 }

// NON-exported functions past this comment

function createBoard(scene, loader) {
  loader.load('./models/chess.glb', (gltf) => {
      var board = gltf.scene;
      board.scale.set(0.25, 0.25, 0.25)
      board.position.set(0, 0, 0)
      scene.add(board)
  }, undefined, (error) => {
    console.error(error)
  })
}

/*function createTable(scene, loader) {
  loader.load('./models/StylishDesk.glb', (gltf) => {
    var table = gltf.scene;
    table.scale.set(3, 0, 2);
    table.position.set(0, -0.22, 0);
    scene.add(table)
  }, undefined, (error) => {
    console.error(error);
  })
}*/

function createWhitePieces(scene, loader) {
  // Load Pawns
  for (let i = 0; i < 8; i++) {
    loader.load('./models/white_pawn.glb', (gltf) => {
        var pawn = gltf.scene;
        pieceArray[(8) + i] = gltf.scene.children[0]
        pawn.scale.set(pieceScale, pieceScale, pieceScale);
        pawn.position.set(1, 0, 1.4 -(i * squareSize));
        scene.add(pawn)
    }, undefined, (error) => {
      console.error(error)
    })
  }
  // Load Rooks
  for (let i = 0; i < 2; i++) {
    loader.load('./models/white_rook.glb', (gltf) => {
        var rook = gltf.scene;
        pieceArray[(7 * i)] = gltf.scene.children[0];
        rook.scale.set(pieceScale, pieceScale, pieceScale);
        rook.position.set(1.4, 0, 1.4 - (i*2.8))
        scene.add(rook);
    }, undefined, (error) => {
      console.error(error)
    })
  }
  // load knights
  for (let i = 0; i < 2; i++) {
    loader.load('./models/white_knight.glb', (gltf) => {
      var knight = gltf.scene;
      pieceArray[1 + (i * 5)] = gltf.scene.children[0]
      knight.scale.set(pieceScale, pieceScale, pieceScale);
      knight.position.set(1.4, 0, 1 - (i*2))
      scene.add(knight);
    }, undefined, (error) => {
      console.error(error)
    })
  }
  // load bishops
  for (let i = 0; i < 2; i++) {
    loader.load('./models/white_bishop.glb', (gltf) => {
      var bishop = gltf.scene;
      pieceArray[2 + (i * 3)] = gltf.scene.children[0]
      bishop.scale.set(pieceScale, pieceScale, pieceScale);
      bishop.position.set(1.4, 0, 0.6 - (i*1.2))
      scene.add(bishop);
    }, undefined, (error) => {
      console.error(error)
    })
  }
  // load king and queen
  loader.load('./models/white_king.glb', (gltf) => {
      var king = gltf.scene;
      pieceArray[4] = gltf.scene.children[0]
      king.scale.set(pieceScale, pieceScale, pieceScale)
      king.position.set(1.4, 0, -0.2)
      scene.add(king)
  }, undefined, (error) => {
    console.error(error)
  })

  loader.load('./models/white_queen.glb', (gltf) => {
    var queen = gltf.scene;
    pieceArray[3] = gltf.scene.children[0];
    queen.scale.set(pieceScale, pieceScale, pieceScale)
    queen.position.set(1.4, 0, 0.2)
    scene.add(queen)
  }, undefined, (error) => {
    console.error(error)
  })

} 

function createBlackPieces(scene, loader) {
  for(let i = 0; i < 8; i++) {
    loader.load('./models/black_pawn.glb', (gltf) => {
      var pawn = gltf.scene;
      pieceArray[(6 * 8) + i] = gltf.scene.children[0];
      pawn.scale.set(pieceScale, pieceScale, pieceScale);
      pawn.position.set(-1, 0, 1.4 - (i * squareSize));
      scene.add(pawn)
    }, undefined, (error) => {
      console.error(error);
    })
  }
  // Load Rooks
  for (let i = 0; i < 2; i++) {
    loader.load('./models/black_rook.glb', (gltf) => {
        var rook = gltf.scene;
        pieceArray[8 * 7 + (i * 7)] = gltf.scene.children[0]
        rook.scale.set(pieceScale, pieceScale, pieceScale);
        rook.position.set(-1.4, 0, 1.4 - (i*2.8))
        scene.add(rook);
    }, undefined, (error) => {
      console.error(error)
    })
  }

  for (let i = 0; i < 2; i++) {
    loader.load('./models/black_knight.glb', (gltf) => {
      var knight = gltf.scene;
      pieceArray[8 * 7 + 1 + (i * 5)] = gltf.scene.children[0]
      knight.scale.set(pieceScale, pieceScale, pieceScale);
      knight.position.set(-1.4, 0, 1 - (i*2))
      scene.add(knight);
    }, undefined, (error) => {
      console.error(error)
    })
  }
  // load bishops
  for (let i = 0; i < 2; i++) {
    loader.load('./models/black_bishop.glb', (gltf) => {
      var bishop = gltf.scene;
      pieceArray[8 * 7 + 2 + (i * 3)] = gltf.scene.children[0];
      bishop.scale.set(pieceScale, pieceScale, pieceScale);
      bishop.position.set(-1.4, 0, 0.6 - (i*1.2))
      scene.add(bishop);
    }, undefined, (error) => {
      console.error(error)
    })
  }
  // load king and queen
  loader.load('./models/black_king.glb', (gltf) => {
      var king = gltf.scene;
      pieceArray[8 * 7 + 4] = gltf.scene.children[0]
      king.scale.set(pieceScale, pieceScale, pieceScale)
      king.position.set(-1.4, 0, -0.2)
      scene.add(king)
  }, undefined, (error) => {
    console.error(error)
  })

  loader.load('./models/black_queen.glb', (gltf) => {
    var queen = gltf.scene;
    pieceArray[8 * 7 + 3] = gltf.scene.children[0]
    queen.scale.set(pieceScale, pieceScale, pieceScale)
    queen.position.set(-1.4, 0, 0.2)
    scene.add(queen)
  }, undefined, (error) => {
    console.error(error)
  })
}

function initRenderer() {
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.needsUpdate = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    document.body.appendChild(renderer.domElement);
    return renderer;
}

function initCamera() {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 1 , 500);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);
  return camera;
}

function initializeArray(array) {
  for(let i = 0; i < 64; i++) {
      pieceArray.push(undefined);
  }
}
