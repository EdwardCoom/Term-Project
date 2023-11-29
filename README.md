# Term-Project
Daniel Cunningham, Zach Coomer, Colin Douglas, Zachary Rose  
Date: 10/19/2023

A 3D rendered environment where the player can play a game of chess. The player can play both sides, or choose to play against an AI controlled opponent. The camera can be controlled for optimal viewing.
Written with Three.js and runs on WebGL.

## Required Files
* /Common --> WebGL utility files
* /src --> Code for generating and controlling the environment
* /src/models --> Contains the scene assets

## Compilation instructions

To run this program, you will need to install the development tools Node.js and Vite. Follow the first half of this guide for detailed instructions https://threejs.org/docs/#manual/en/introduction/Installation.


## Program usage.

To launch the program, once the dependancies are installed, navigate to the src folder and use the command "npx vite". 
This will start a localhost server, which you can open from the browser, or press 'o' in the terminal to open a tab automatically. Make sure to press 'q' in the terminal to quit when done. 

### How to Play and Implemented Interface
On load, Chess Simulator is automatically set in "Free Look" camera settings and the player turn is white. You can immediately move to a camera position you want by using the following "Free Look" camera settings. You may also immediately move a white chess piece on a valid space on the chess board. You can do this by selecting the piece you want to move and then select the space you want to move to. You may take a piece by seleting the location that piece is currently residing. To alter the perspective, toggle AI, or start a new game -- use the Options menu at the top left by clicking it and then selecting the option you want from the drop down menu. The Option selection interfaces work as follows. 

* Perspectives
  
  * Free Camera
    - To rotate the camera, drag the left mouse button on the screen.
    - To pan the camera, drag the right mouse button on the screen, or hold shift and drag the left mouse button.
    - To zoom, move the scroll wheel on the mouse, or hold the middle mouse button, and move the mouse up and down.

  * Turn Based
    - On selecting this option, the camera will automatically adjust over the board and swap sides as each player makes a choice.

  * White
    - This selection automatically positions the camera above the white side of the board facing towards the black side of the board.

  * Black 
    - This selection automatically positions the camera above the black side of the board facing towards the white side of the board.

  * Side View
    - This selection positions the camera to the side of the chess board at a distance allowing for a spectator view.

* Game Options
  
  * Toggle AI
    - Selecion to toggle the AI opponent on or off, defaults to off. If toggled on, the black player will be the AI opponent.
  
  * Undo Move
    - This option allows the user to take back the previous move when selected.
  
  * New Game
    - Selection will refresh the page, starting a new game.

## Met Requirements
As this project was created for a term project in CSCI 445 at the University of Tennessee at Martin, we had certain requirements to meet. Here are the requirements we were able to satisfy.

  * 3D transformations and camera movement
    -  We were able to implement movement of 3D chess pieces across the chess board and also on all three axis of movement as shown when the pieces are placed off of the chess board and onto the table. The camera is moveable from free look to user selectable preset perspectives.

  * Multiple Lights
    - We implemented three light sources. Two of which are directional. These include the ambient light, a point light - which illuminates the chessboard for a more realistic view, and a directional light - which illuminates the room and chess board from a different table.

  * Textures
    - We used different models which implement different textures. The textures range from matte to reflective to enhance the viewing experience.

  * User Interactivity
    - By the nature of the program, we satified this requirement. The user is allowed to select, move, and take chess pieces. The user can also interact with a CSS menu that allows for different camera angles, toggling a computer AI opponent, and starting a new game.

  * A playable environment/game
    - We have a playable game environment that allows the user to play a game and move pieces. This is done by loading the models with a boardState array that records the positions of the pieces and renders the board when a piece is moved. You can take the pieces until there are no moves left before a checkmate which constitutes a win in chess.

