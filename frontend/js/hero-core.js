import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


const HERO_SELECTOR = ".hero-visual";
const CONFIG = {
    colors: {
        background: 0x050505,
        core: 0xf2f2f2,
        wireframe: 0x707070,
        orbit: 0x242424,
        particles: 0xb8b8b8,
        accent: 0x7dd3fc
    },
    camera: {
        fov: 42,
        near: 0.1,
        far: 100
    },
    core: {
        radius: 0.72,
        segments: 48
    },
    architecture: {
        radius: 1.25,
        segments: 2
    },
    orbits: {
        outerRadius: 1.9,
        innerRadius: 1.45,
        outerScaleY: 0.42,
        innerScaleY: 0.58,
        outerSpeed: 0.08,
        innerSpeed: -0.12
    },
    particles: {
        count: 650,
        radius: 4.5,
        size: 0.018
    },
    interaction: {
        cameraStrength: 0.16,
        smoothing: 0.045
    },
    animation: {
        coreFloatSpeed: 0.8,
        coreFloatAmount: 0.06,
        pulseSpeed: 1.5
    }
};

const state = {
    scene: null,
    camera: null,
    renderer: null,
    heroVisual: null,
    coreGroup: null,
    architectureGroup: null,
    orbitGroup: null,
    particles: null,
    accentNodes: [],
    animationFrame: null,
    mouse: {
        x: 0,
        y: 0
    },
    targetCamera: {
        x: 0,
        y: 0
    },
    currentCamera: {
        x: 0,
        y: 0
    },
    clock: new THREE.Clock(),
    reducedMotion: false,
    initialized: false
};

function initHeroCore() {
    const heroVisual =
        document.querySelector(
            HERO_SELECTOR
        );
    if (!heroVisual) {
        return;
    }
    state.reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
    state.heroVisual =
        heroVisual;
    createScene();
    createCamera();
    createRenderer();
    createCore();
    createArchitecture();
    createOrbits();
    createParticles();
    createAccentNodes();
    setupInteraction();
    setupResize();
    state.initialized =
        true;
    animate();
}

function createScene() {
    state.scene =
        new THREE.Scene();
    state.scene.background =
        null;
}

function createCamera() {
    const width =
        state.heroVisual.clientWidth;
    const height =
        state.heroVisual.clientHeight;
    const aspect =
        width / height;
    state.camera =
        new THREE.PerspectiveCamera(
            CONFIG.camera.fov,
            aspect,
            CONFIG.camera.near,
            CONFIG.camera.far
        );
    state.camera.position.set(
        0,
        0,
        6
    );
}

function createRenderer() {
    state.renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference:
                "high-performance"
        });
    state.renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );
    state.renderer.setSize(
        state.heroVisual.clientWidth,
        state.heroVisual.clientHeight
    );
    state.renderer.outputColorSpace =
        THREE.SRGBColorSpace;
    state.renderer.domElement.classList.add(
        "hero-core-canvas"
    );
    state.heroVisual.appendChild(
        state.renderer.domElement
    );
}

function createCore() {
    state.coreGroup =
        new THREE.Group();
    const geometry =
        new THREE.IcosahedronGeometry(
            CONFIG.core.radius,
            4
        );
    const material =
        new THREE.MeshBasicMaterial({
            color:
                CONFIG.colors.core
        });
    const core =
        new THREE.Mesh(
            geometry,
            material
        );
    state.coreGroup.add(
        core
    );
    // Genera profundidad sin introducir otro color.
    const innerGeometry =
        new THREE.IcosahedronGeometry(
            CONFIG.core.radius * 0.78,
            3
        );
    const innerMaterial =
        new THREE.MeshBasicMaterial({
            color:
                CONFIG.colors.background,
            transparent:
                true,
            opacity:
                0.55
        });
    const innerCore =
        new THREE.Mesh(
            innerGeometry,
            innerMaterial
        );
    state.coreGroup.add(
        innerCore
    );
    state.scene.add(
        state.coreGroup
    );
}

function createArchitecture() {
    state.architectureGroup =
        new THREE.Group();
    const geometry =
        new THREE.IcosahedronGeometry(
            CONFIG.architecture.radius,
            CONFIG.architecture.segments
        );
    const material =
        new THREE.MeshBasicMaterial({
            color:
                CONFIG.colors.wireframe,
            wireframe:
                true,
            transparent:
                true,
            opacity:
                0.24
        });
    const architecture =
        new THREE.Mesh(
            geometry,
            material
        );
    state.architectureGroup.add(
        architecture
    );
    // Crea complejidad y profundidad mediante una segunda capa rotada.
    const secondaryGeometry =
        new THREE.IcosahedronGeometry(
            CONFIG.architecture.radius * 0.82,
            1
        );
    const secondaryMaterial =
        new THREE.MeshBasicMaterial({
            color:
                CONFIG.colors.wireframe,
            wireframe:
                true,
            transparent:
                true,
            opacity:
                0.14
        });
    const secondary =
        new THREE.Mesh(
            secondaryGeometry,
            secondaryMaterial
        );
    secondary.rotation.x =
        Math.PI / 4;
    secondary.rotation.y =
        Math.PI / 6;
    state.architectureGroup.add(
        secondary
    );
    state.scene.add(
        state.architectureGroup
    );
}

function createOrbits() {
    state.orbitGroup =
        new THREE.Group();
    createOrbit({
        radius:
            CONFIG.orbits.outerRadius,
        scaleY:
            CONFIG.orbits.outerScaleY,
        rotationX:
            0.15,
        rotationZ:
            -0.25,
        speed:
            CONFIG.orbits.outerSpeed,
        nodePosition:
            "top"
    });
    createOrbit({
        radius:
            CONFIG.orbits.innerRadius,
        scaleY:
            CONFIG.orbits.innerScaleY,
        rotationX:
            -0.45,
        rotationZ:
            0.45,
        speed:
            CONFIG.orbits.innerSpeed,
        nodePosition:
            "right"
    });
    state.scene.add(
        state.orbitGroup
    );
}

function createOrbit({
    radius,
    scaleY,
    rotationX,
    rotationZ,
    speed,
    nodePosition
}) {
    const orbit =
        new THREE.Group();
    const geometry =
        new THREE.TorusGeometry(
            radius,
            0.008,
            8,
            128
        );
    const material =
        new THREE.MeshBasicMaterial({
            color:
                CONFIG.colors.orbit,
            transparent:
                true,
            opacity:
                0.9
        });
    const ring =
        new THREE.Mesh(
            geometry,
            material
        );
    // Comprime el eje Y para crear una órbita elíptica.
    ring.scale.y =
        scaleY;
    orbit.rotation.x =
        rotationX;
    orbit.rotation.z =
        rotationZ;
    orbit.userData.speed =
        speed;
    orbit.userData.ring =
        ring;
    orbit.add(
        ring
    );
    const node =
        createOrbitalNode(
            radius,
            nodePosition
        );
    orbit.add(
        node
    );
    state.orbitGroup.add(
        orbit
    );
}

function createOrbitalNode(
    radius,
    position
) {
    const geometry =
        new THREE.SphereGeometry(
            0.055,
            16,
            16
        );
    const material =
        new THREE.MeshBasicMaterial({
            color:
                CONFIG.colors.core
        });
    const node =
        new THREE.Mesh(
            geometry,
            material
        );
    const distance =
        radius;
    switch (position) {
        case "top":
            node.position.set(
                0,
                distance,
                0
            );
            break;
        case "right":
            node.position.set(
                distance,
                0,
                0
            );
            break;
        default:
            node.position.set(
                0,
                distance,
                0
            );
    }
    return node;
}

function createParticles() {
    const positions =
        new Float32Array(
            CONFIG.particles.count * 3
        );
    for (
        let index = 0;
        index < CONFIG.particles.count;
        index++
    ) {
        const offset =
            index * 3;
        // Distribución aleatoria sobre una esfera.
        const radius =
            CONFIG.particles.radius *
            Math.pow(
                Math.random(),
                0.55
            );
        const theta =
            Math.random() *
            Math.PI *
            2;
        const phi =
            Math.acos(
                (Math.random() * 2) - 1
            );
        positions[offset] =
            radius *
            Math.sin(phi) *
            Math.cos(theta);
        positions[offset + 1] =
            radius *
            Math.sin(phi) *
            Math.sin(theta);
        positions[offset + 2] =
            radius *
            Math.cos(phi);
    }
    const geometry =
        new THREE.BufferGeometry();
    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );
    const material =
        new THREE.PointsMaterial({
            color:
                CONFIG.colors.particles,
            size:
                CONFIG.particles.size,
            sizeAttenuation:
                true,
            transparent:
                true,
            opacity:
                0.42,
            depthWrite:
                false
        });
    state.particles =
        new THREE.Points(
            geometry,
            material
        );
    state.scene.add(
        state.particles
    );
}

function createAccentNodes() {
    const positions = [
        {
            x: -1.55,
            y: 0.65,
            z: 0.2
        },
        {
            x: 1.35,
            y: -0.45,
            z: 0.15
        },
        {
            x: 0.35,
            y: 1.55,
            z: -0.3
        }
    ];
    positions.forEach(
        (position, index) => {
            const geometry =
                new THREE.SphereGeometry(
                    index === 0
                        ? 0.035
                        : 0.025,
                    12,
                    12
                );
            const material =
                new THREE.MeshBasicMaterial({
                    color:
                        CONFIG.colors.accent
                });
            const node =
                new THREE.Mesh(
                    geometry,
                    material
                );
            node.position.set(
                position.x,
                position.y,
                position.z
            );
            node.userData.phase =
                index *
                Math.PI *
                0.8;
            node.userData.baseScale =
                1;
            state.accentNodes.push(
                node
            );
            state.scene.add(
                node
            );
        }
    );
}

function setupInteraction() {
    if (state.reducedMotion) {
        return;
    }
    state.heroVisual.addEventListener(
        "pointermove",
        handlePointerMove
    );
    state.heroVisual.addEventListener(
        "pointerleave",
        handlePointerLeave
    );
}

function handlePointerMove(event) {
    const rect =
        state.heroVisual.getBoundingClientRect();
    const normalizedX =
        (
            event.clientX -
            rect.left
        ) /
        rect.width;
    const normalizedY =
        (
            event.clientY -
            rect.top
        ) /
        rect.height;
    state.mouse.x =
        (normalizedX - 0.5) * 2;
    state.mouse.y =
        (normalizedY - 0.5) * 2;
}

function handlePointerLeave() {
    state.mouse.x =
        0;
    state.mouse.y =
        0;
}

function setupResize() {
    window.addEventListener(
        "resize",
        handleResize
    );
}

function handleResize() {
    if (!state.initialized) {
        return;
    }
    const width =
        state.heroVisual.clientWidth;
    const height =
        state.heroVisual.clientHeight;
    state.camera.aspect =
        width / height;
    state.camera.updateProjectionMatrix();
    state.renderer.setSize(
        width,
        height
    );
}

function animate() {
    state.animationFrame =
        requestAnimationFrame(
            animate
        );
    const elapsed =
        state.clock.getElapsedTime();
    updateCore(
        elapsed
    );
    updateArchitecture(
        elapsed
    );
    updateOrbits();
    updateParticles(
        elapsed
    );
    updateAccentNodes(
        elapsed
    );
    updateCamera();
    state.renderer.render(
        state.scene,
        state.camera
    );
}

function updateCore(
    elapsed
) {
    if (!state.coreGroup) {
        return;
    }
    if (state.reducedMotion) {
        return;
    }
    const floatOffset =
        Math.sin(
            elapsed *
            CONFIG.animation.coreFloatSpeed
        ) *
        CONFIG.animation.coreFloatAmount;
    state.coreGroup.position.y =
        floatOffset;
    state.coreGroup.rotation.y =
        elapsed *
        0.08;
    state.coreGroup.rotation.x =
        Math.sin(
            elapsed * 0.35
        ) *
        0.04;
}

function updateArchitecture(
    elapsed
) {
    if (!state.architectureGroup) {
        return;
    }
    if (state.reducedMotion) {
        return;
    }
    state.architectureGroup.rotation.y =
        elapsed *
        0.035;
    state.architectureGroup.rotation.x =
        Math.sin(
            elapsed * 0.22
        ) *
        0.08;
}

function updateOrbits() {
    if (!state.orbitGroup) {
        return;
    }
    state.orbitGroup.children.forEach(
        (orbit) => {
            if (
                state.reducedMotion
            ) {
                return;
            }
            orbit.rotation.y +=
                orbit.userData.speed *
                0.01;
        }
    );
}

function updateParticles(
    elapsed
) {
    if (!state.particles) {
        return;
    }
    if (state.reducedMotion) {
        return;
    }
    state.particles.rotation.y =
        elapsed *
        0.008;
    state.particles.rotation.x =
        Math.sin(
            elapsed * 0.12
        ) *
        0.025;
}

function updateAccentNodes(
    elapsed
) {
    state.accentNodes.forEach(
        (node) => {
            if (state.reducedMotion) {
                return;
            }
            const phase =
                node.userData.phase;
            const pulse =
                1 +
                Math.sin(
                    elapsed *
                    CONFIG.animation.pulseSpeed +
                    phase
                ) *
                0.35;
            node.scale.setScalar(
                pulse
            );
        }
    );
}


function updateCamera() {
    if (!state.camera) {
        return;
    }
    if (state.reducedMotion) {
        return;
    }
    state.targetCamera.x =
        state.mouse.x *
        CONFIG.interaction.cameraStrength;
    state.targetCamera.y =
        state.mouse.y *
        CONFIG.interaction.cameraStrength;
    state.currentCamera.x +=
        (
            state.targetCamera.x -
            state.currentCamera.x
        ) *
        CONFIG.interaction.smoothing;
    state.currentCamera.y +=
        (
            state.targetCamera.y -
            state.currentCamera.y
        ) *
        CONFIG.interaction.smoothing;
    state.camera.position.x =
        state.currentCamera.x;
    state.camera.position.y =
        -state.currentCamera.y;
    state.camera.lookAt(
        0,
        0,
        0
    );
}

if (
    document.readyState ===
    "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",
        initHeroCore
    );
} else {
    initHeroCore();
}
