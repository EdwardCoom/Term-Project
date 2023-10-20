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

### Implemented interface
* Camera controls
  - To rotate the camera, drag the left mouse button on the screen.
  - To pan the camera, drag the right mouse button on the screen, or hold shift and drag the left mouse button.
  - To zoom, move the scroll wheel on the mouse, or hold the middle mouse button, and move the mouse up and down.
