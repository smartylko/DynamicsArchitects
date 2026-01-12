import * as THREE from "three";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
gsap.registerPlugin(ScrollTrigger);

// Set up canvas sizes based on container
const sizesG = {
    width: $(".animation-globe").outerWidth(),
    height: $(".animation-globe").outerHeight(),
};

// Set up the Three.js scene, camera, and renderer
const sceneG = new THREE.Scene();
const cameraG = new THREE.PerspectiveCamera(
    5,
    sizesG.width / sizesG.height,
    0.1,
    1000
);
const canvasG = document.querySelector("#globe");
const rendererG = new THREE.WebGLRenderer({
    canvas: canvasG,
    alpha: true,
    antialias: true,
});

rendererG.setSize(sizesG.width, sizesG.height);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 5);
sceneG.add(ambientLight);

// Globe (Earth)
const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
const earthTexture = new THREE.TextureLoader().load("https://www.cdaarchitects.in/img/new/map.png");
// "http://localhost:8080//cda-landing-page/img/map.png"

const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture,
    color: new THREE.Color("#E4E4E4"),
    roughness: 0.6,
    metalness: 0.5,
    opacity: 1,
    transparent: true,
});

const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
sceneG.add(earthMesh);
cameraG.position.z = 115;

// Country positions with latitude and longitude
const countryPositions = {
    newDelhi: { latitude: 5, longitude: 124.11 },
    mumbai: { latitude: -1, longitude: 126 },
    chandigarh: { latitude: 5.5, longitude: 125.5 },
    vancouver: { latitude: 8, longitude: 22 },
    tanzania: { latitude: -13, longitude: 40.5 },
};

// Function to convert latitude and longitude to 3D position on the globe
function latLonToVector3(lat, lon, radius = 5) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
}

// Load marker texture
const markerTexture = new THREE.TextureLoader().load(
    "https://www.cdaarchitects.in/img/new/marker.png"
    // "http://localhost:8080//cda-landing-page/img/marker.png"
);

const markers = {};

// Create and position marker icons for each country
Object.keys(countryPositions).forEach((countryId) => {
    const { latitude, longitude } = countryPositions[countryId];
    const markerPosition = latLonToVector3(latitude, longitude, 5.15);

    const markerMaterial = new THREE.SpriteMaterial({
        map: markerTexture,
        transparent: true,
        depthTest: false,
    });

    const marker = new THREE.Sprite(markerMaterial);
    marker.position.copy(markerPosition);
    marker.scale.set(0.56, 0.68, 0.56);
    marker.renderOrder = 1;

    sceneG.add(marker);
    markers[countryId] = marker;
    marker.visible = false;
});

let isRotating = true; // Enable auto-rotation by default
let userInteracting = false;
let interactionTimeout;

function animateG() {
    requestAnimationFrame(animateG);

    // Auto-rotate globe if not interacting
    if (isRotating) {
        earthMesh.rotation.y += 0.0005; // Slow auto-rotation
    }

    // Update marker positions to follow the globe's rotation
    Object.keys(markers).forEach((id) => {
        const { latitude, longitude } = countryPositions[id];
        const markerPosition = latLonToVector3(latitude, longitude, 5.15);

        // Access the marker from the markers object and update its position
        const marker = markers[id]; // Correctly define marker here
        if (marker) {
            marker.position.copy(
                markerPosition.applyQuaternion(earthMesh.quaternion)
            );
        }
    });

    rendererG.render(sceneG, cameraG);
}

animateG();

function latLonToRotation(lat, lon) {
    const xRotation = THREE.MathUtils.degToRad(lat); // Latitude to rotation (adjusted for Three.js)
    const yRotation = THREE.MathUtils.degToRad(-lon); // Longitude to rotation
    return { xRotation, yRotation };
}

function rotateToCountry(countryId) {
    const country = countryPositions[countryId];

    if (country) {
        const { latitude, longitude } = country;
        const { xRotation, yRotation } = latLonToRotation(latitude, longitude);

        // Pause auto-rotation
        isRotating = false;

        gsap.to(earthMesh.rotation, {
            x: xRotation,
            y: yRotation,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
                // Update marker positions dynamically during rotation
                Object.keys(markers).forEach((id) => {
                    const { latitude, longitude } = countryPositions[id];
                    const markerPosition = latLonToVector3(
                        latitude,
                        longitude,
                        5.15
                    );
                    markers[id].position.copy(
                        markerPosition.applyQuaternion(earthMesh.quaternion)
                    );
                });
            },
            onComplete: () => {
                // Hide all markers except the selected one
                Object.keys(markers).forEach(
                    (id) => (markers[id].visible = false)
                );
                markers[countryId].visible = true;
            },
        });
    }
}

$(".map-box").on("click", function () {
    const countryId = $(this).attr("id");
    rotateToCountry(countryId);

    // Stop auto-rotation when a country is selected
    isRotating = false;
});

earthMesh.rotation.set(0, 0, 0); // Reset to default orientation

// Handle user interaction
canvasG.addEventListener("mousedown", (event) => {
    userInteracting = true;
    isRotating = false; // Pause auto-rotation
    clearTimeout(interactionTimeout);
});

canvasG.addEventListener("mousemove", (event) => {
    if (userInteracting) {
        const deltaX =
            event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const deltaY =
            event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        earthMesh.rotation.y += deltaX * 0.005;
        earthMesh.rotation.x += deltaY * 0.005;
    }
});

canvasG.addEventListener("mouseup", () => {
    userInteracting = false;
});

canvasG.addEventListener("mouseleave", () => {
    userInteracting = false;
});

// GSAP timeline for changing globe color on scroll
const changingColor = gsap
    .timeline({
        scrollTrigger: {
            trigger: ".map-section",
            start: "10% 100%",
            end: "10% 20%",
            scrub: 1,
        },
    })
    .to(
        "#dummy-bg",
        {
            backgroundColor: "#151315",
        },
        0
    )
    .to(
        earthMaterial.color,
        {
            r: 1,
            g: 1,
            b: 1,
        },
        0
    );
