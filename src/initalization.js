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
  // Load Pawns
  for (let i = 0; i < 8; i++) {
    loader.load('./models/white_pawn.glb', (gltf) => {
        var pawn = gltf.scene;
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
      var knight = gltf.scene;
      knight.scale.set(pieceScale, pieceScale, pieceScale);
      knight.position.set(1.4, 0, 0.6 - (i*1.2))
      scene.add(knight);
    }, undefined, (error) => {
      console.error(error)
    })
  }
  // load king and queen
  loader.load('./models/white_king.glb', (gltf) => {
      var queen = gltf.scene;
      queen.scale.set(pieceScale, pieceScale, pieceScale)
      queen.position.set(1.4, 0, -0.2)
      scene.add(queen)
  }, undefined, (error) => {
    console.error(error)
  })

  loader.load('./models/white_queen.glb', (gltf) => {
    var queen = gltf.scene;
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
      var knight = gltf.scene;
      knight.scale.set(pieceScale, pieceScale, pieceScale);
      knight.position.set(-1.4, 0, 0.6 - (i*1.2))
      scene.add(knight);
    }, undefined, (error) => {
      console.error(error)
    })
  }
  // load king and queen
  loader.load('./models/black_king.glb', (gltf) => {
      var queen = gltf.scene;
      queen.scale.set(pieceScale, pieceScale, pieceScale)
      queen.position.set(-1.4, 0, -0.2)
      scene.add(queen)
  }, undefined, (error) => {
    console.error(error)
  })

  loader.load('./models/black_queen.glb', (gltf) => {
    var queen = gltf.scene;
    queen.scale.set(pieceScale, pieceScale, pieceScale)
    queen.position.set(-1.4, 0, 0.2)
    scene.add(queen)
  }, undefined, (error) => {
    console.error(error)
  })
}
