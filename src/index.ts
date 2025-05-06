import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";

// Get the canvas element
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

// Generate the BABYLON 3D engine
const engine = new Engine(canvas, true);

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

    // Create a 5x8 platform (using a thin box for better visibility)
    const platform = MeshBuilder.CreateBox("platform", {
        width: 5,   // X-axis dimension
        height: 0.1, // Make it flat (Y-axis)
        depth: 8    // Z-axis dimension
    }, scene);
    platform.position.y = -0.05; // Adjust position to align surface at ground level

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
