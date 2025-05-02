import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";
import { AdvancedDynamicTexture, TextBlock, Button, Control } from "@babylonjs/gui";


// Get the canvas element
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;


// Generate the BABYLON 3D engine
const engine = new Engine(canvas, true);


// Game state
let timeLeft = 30;
let timerInterval: number | null = null;
let gameOver = false;


// Create the scene
const createScene = (): Scene => {
    const scene = new Scene(engine);


    // Create a camera
    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);


    // Create a light
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;


    // Create a sphere
    const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);


    // Create GUI
    const guiTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
   
    // Timer display
    const timerText = new TextBlock();
    timerText.text = `Time: ${timeLeft}`;
    timerText.color = "white";
    timerText.fontSize = 24;
    timerText.top = -200;
    guiTexture.addControl(timerText);


    // Add time button
    const addTimeButton = Button.CreateSimpleButton("addTime", "Add 10 Seconds");
    addTimeButton.width = "200px";
    addTimeButton.height = "40px";
    addTimeButton.color = "white";
    addTimeButton.top = -150;
    addTimeButton.onPointerClickObservable.add(() => {
        if (!gameOver) {
            timeLeft += 10;
            timerText.text = `Time: ${timeLeft}`;
        }
    });
    guiTexture.addControl(addTimeButton);


    // Game over screen
    const gameOverText = new TextBlock();
    gameOverText.text = "GAME OVER";
    gameOverText.color = "red";
    gameOverText.fontSize = 48;
    gameOverText.isVisible = false;
    guiTexture.addControl(gameOverText);


    const restartButton = Button.CreateSimpleButton("restart", "Restart");
    restartButton.width = "200px";
    restartButton.height = "40px";
    restartButton.color = "white";
    restartButton.top = 50;
    restartButton.isVisible = false;
    restartButton.onPointerClickObservable.add(() => {
        timeLeft = 30;
        gameOver = false;
        timerText.text = `Time: ${timeLeft}`;
        gameOverText.isVisible = false;
        restartButton.isVisible = false;
        startTimer();
    });
    guiTexture.addControl(restartButton);


    // Timer function
    const startTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
       
        timerInterval = window.setInterval(() => {
            if (!gameOver) {
                timeLeft--;
                timerText.text = `Time: ${timeLeft}`;
               
                if (timeLeft <= 0) {
                    gameOver = true;
                    gameOverText.isVisible = true;
                    restartButton.isVisible = true;
                    if (timerInterval) {
                        clearInterval(timerInterval);
                        timerInterval = null;
                    }
                }
            }
        }, 1000);
    };


    startTimer();


    return scene;
};


// Create the scene
const scene = createScene();


// Run the render loop
engine.runRenderLoop(() => {
    scene.render();
});


// Handle window resize
window.addEventListener("resize", () => {
    engine.resize();
});



