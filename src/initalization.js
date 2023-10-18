/* Each square on the board seems to be 0.4 in length and width.
 * Later, the algorithms below will use this to determine the place
 * of the piece on the board
 */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'

const pieceScale = 0.25
const squareSize = 0.4
export function createChessEnvironment(scene) {
  var loader = new GLTFLoader();
  createBoard(scene, loader)
  createTable(scene, loader)
  createWhitePieces(scene, loader)
  createBlackPieces(scene, loader)
}


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

function createTable(scene, loader) {
  loader.load('./models/StylishDesk.glb', (gltf) => {
    var table = gltf.scene;
    table.scale.set(3, 0, 2);
    table.position.set(0, -0.22, 0);
    scene.add(table)
  }, undefined, (error) => {
    console.error(error);
  })
}

function createWhitePieces(scene, loader) {
  for (let i = 0; i < 8; i++) {
    loader.load('./models/white_pawn.glb', (gltf) => {
        var pawn = gltf.scene;
        pawn.traverse((node) => {
          if(node.isMesh) {
            node.receiveShadow = true;
          }
        })
        pawn.scale.set(pieceScale, pieceScale, pieceScale);
        pawn.position.set(1, 0, 1.4 -(i * squareSize));
        scene.add(pawn)
    }, undefined, (error) => {
      console.error(error)
    })
  }
}

function createBlackPieces(scene, loader) {
  for(let i = 0; i < 8; i++) {
    loader.load('./models/white_pawn.glb', (gltf) => {
      var pawn = gltf.scene;
      pawn.scale.set(pieceScale, pieceScale, pieceScale);
      pawn.position.set(-1, 0, 1.4 - (i * squareSize));
      scene.add(pawn)
    }, undefined, (error) => {
      console.error(error);
    })
  }
}
