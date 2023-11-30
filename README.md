# Term-Project
Daniel Cunningham, Zach Coomer, Colin Douglas, Zachary Rose  
Date: 11/29/2023

A 3D rendered environment where the player can play a game of chess. The player can play both sides, or choose to play against an AI controlled opponent. The camera can be controlled for optimal viewing.
Written with Three.js and runs on WebGL.

## Required Files
* /Common --> WebGL utility files
* /src --> Code for generating and controlling the environment
* /src/models --> Contains the scene assets

## Compilation instructions

To run this program, you will need to install the development tools Node.js and Vite. Follow the first half of this guide for detailed instructions https://threejs.org/docs/#manual/en/introduction/Installation.


## Program usage.

To launch the program, once the dependencies are installed from the previous guide, navigate to the src folder and use the command "npx vite". 
This will start a localhost server, which you can open from the browser, or press 'o' in the terminal to open a tab automatically. Make sure to press 'q' in the terminal to quit when done. 

### How to Play and Implemented Interface
Upon loading, You will begin in "free look" mode, and it will be white's turn. Please see below for a detailed description of how to move the camera. To move a piece, please click it directly with the mouse, and then click the square you'd like to move to. You may take a piece by selecting the square where the piece resides, or by clicking the opposing piece directly. To cancel a move, use the right click. To alter the perspective view, toggle the AI, or start a new game, use the Options menu at the top left by clicking it, and then by selecting the option you want from the drop down menu. The Option selection interfaces work as follows:  

* Perspectives
  
  * Free Camera
    - To rotate the camera, drag the left mouse button on the screen.
    - To pan the camera, drag the right mouse button on the screen, or hold shift and drag the left mouse button.
    - To zoom, move the scroll wheel on the mouse, or hold the middle mouse button, and move the mouse up and down.

  * Turn Based
    - Upon selecting this option, the camera will automatically adjust over the board and swap sides as each player makes a move.

  * White
    - This selection automatically positions the camera above the white side of the board, facing towards the black side of the board.

  * Black 
    - This selection automatically positions the camera above the black side of the board, facing towards the white side of the board.

  * Side View
    - This selection positions the camera to the side of the chess board at a distance, allowing for the view of a spectator.

* Game Options
  
  * Toggle AI
    - Select to toggle the AI opponent on or off, with the default being off. If toggled on, the black player will be the AI opponent. Please only use this during white's turn, but it can be enabled in the middle of a game if you'd like to try setting up an interesting board state first.
  
  * Undo Move
    - This option allows the user to take back the previous move when selected. This will undo both players' moves, but if you are facing AI, make sure to start again with white's move when you are done, or the behavior may be unexpected.
  
  * New Game
    - Selection will refresh the page, starting a new game.

## Requirements
As this project was created for a term project in CSCI 445 at the University of Tennessee at Martin, we had certain requirements to meet. Here are the requirements we satisfy:

  * 3D transformations and camera movement
    -  We were able to implement movement of 3D chess pieces across the chess board and also on all three axes of movement, demonstrated when the pieces are placed off of the chess board and onto the table. The camera is moveable from free look to user selectable preset perspectives.

  * Multiple Lights
    - We implemented three light sources. These include the ambient light, a point light - which illuminates the chessboard for a more realistic view, and a directional light - which illuminates the room and chess board from a different angle.

  * Textures
    - We used different models each with their own textures as needed.

  * User Interactivity
    - This requirement is satisfied by the nature of chess. The user is able to select, move, and take chess pieces. The user can also interact with a CSS menu that allows for different camera angles, toggling a computer AI opponent, and starting a new game.

  * A playable environment/game
    - We have a playable game environment that allows the user to play a game, move pieces, take pieces, and look around the environment. Once you take the opponent's king, you can consider yourself the victor.

