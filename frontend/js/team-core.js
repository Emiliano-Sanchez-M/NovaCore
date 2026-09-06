import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const CONFIG = {
    colors: {
        background: 0x050505,
        core: 0xf2f2f2,
        coreInner: 0x050505,
        wireframe: 0x242424,
        connection: 0x383838,
        label: 0xf2f2f2,
        node: 0x707070
    },
    core: {
        radius: 0.22,
        detail: 2
    },
    sphere: {
        radius: 2.35
    },
    labels: {
        fontSize: 64,
        canvasWidth: 1800,
        canvasHeight: 260,
        width: 3.0,
        height: 0.58,
        hoverScale: 1.08
    },
    nodes: {
        radius: 0.035
    },
    connections: {
        neighbors: 3,
        opacity: 0.45
    },
    rotation: {
        x: 0.0007,
        y: 0.0015,
        z: 0.0004
    },
    mouse: {
        influenceX: 0.45,
        influenceY: 0.45,
        smoothing: 0.055
    },
    camera: {
        fov: 42,
        near: 0.1,
        far: 100,
        positionZ: 7
    },
    responsive: {
        mobileBreakpoint: 767
    }
};


const TEAM_DATA = {
    emiliano: {
        technologies: [
            "Java",
            "Spring Boot",
            "JavaFX",
            "PostgreSQL",
            "SQL",
            "JavaScript",
            "HTML",
            "CSS",
            "Docker",
            "Git",
            "Arduino",
            "ESP32"
        ]
    }
};

document.addEventListener(
    "DOMContentLoaded",
    initializeTeamCores
);


function initializeTeamCores() {
    const containers =
        document.querySelectorAll(
            "[data-three-team]"
        );
    if (!containers.length) {
        return;
    }
    containers.forEach(
        (container) => {
            const member =
                container.closest(
                    "[data-member-id]"
                );
            if (!member) {
                return;
            }
            const memberId =
                member.dataset.memberId;
            const data =
                TEAM_DATA[memberId];
            if (!data) {
                console.warn(
                    `No team data found for: ${memberId}`
                );
                return;
            }
            setupResponsiveTeamCore(
                member,
                container,
                data.technologies
            );
        }
    );
}

function setupResponsiveTeamCore(
    member,
    container,
    technologies
) {
    const technologyList =
        member.querySelector(
            ".team-member__technology-list"
        );
    renderTechnologyList(
        technologyList,
        technologies
    );
    const mobileQuery =
        window.matchMedia(
            `(max-width: ${CONFIG.responsive.mobileBreakpoint}px)`
        );
    function syncCore() {
        if (mobileQuery.matches) {
            if (container._teamCore) {
                container._teamCore.destroy();
            }
            return;
        }
        if (!container._teamCore) {
            createTeamCore(
                container,
                technologies
            );
        }
    }
    syncCore();
    const handleBreakpointChange =
        () => {
            syncCore();
        };
    if (
        typeof mobileQuery.addEventListener ===
        "function"
    ) {
        mobileQuery.addEventListener(
            "change",
            handleBreakpointChange
        );
    }
    else {
        // Compatibilidad con navegadores que no soportan addEventListener.
        mobileQuery.addListener(
            handleBreakpointChange
        );
    }
    container._teamResponsive = {
        destroy() {
            if (
                typeof mobileQuery.removeEventListener ===
                "function"
            ) {
                mobileQuery.removeEventListener(
                    "change",
                    handleBreakpointChange
                );
            }       else {
                mobileQuery.removeListener(
    
                     handleBreakpointChange
                );
            }
            if (container._teamCore) {
                container._teamCore.destroy();
            }
            delete container._teamResponsive;
        }
    };
}

function renderTechnologyList(
    list,
    technologies
) {
    if (!list) {
        return;
    }
    list.innerHTML = "";
    technologies.forEach(
        (technology, index) => {
            const item =
                document.createElement(
                    "li"
                );
            const number =
                document.createElement(
                    "span"
                );
            number.className =
                "team-member__technology-number";
            number.textContent =
                String(index + 1).padStart(
                    2,
                    "0"
                );
            const name =
                document.createElement(
                    "span"
                );
            name.className =
                "team-member__technology-name";
            name.textContent =
                technology;
            item.appendChild(
                number
            );
            item.appendChild(
                name
            );
            list.appendChild(
                item
            );
        }
    );
}

function createTeamCore(
    container,
    technologies
) {
    const scene =
        new THREE.Scene();
    const camera =
        new THREE.PerspectiveCamera(
            CONFIG.camera.fov,
            1,
            CONFIG.camera.near,
            CONFIG.camera.far
        );
    camera.position.z =
        CONFIG.camera.positionZ;
    const renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );
    renderer.setClearColor(
        CONFIG.colors.background,
        0
    );
    renderer.outputColorSpace =
        THREE.SRGBColorSpace;
    renderer.domElement.classList.add(
        "team-core-canvas"
    );
    container.appendChild(
        renderer.domElement
    );
    const state = {
        mouseTarget: {
            x: 0,
            y: 0
        },
        mouseCurrent: {
            x: 0,
            y: 0
        },
        naturalRotation: {
            x: 0,
            y: 0,
            z: 0
        },
        pointerInside: false,
        hoveredSprite: null
    };
    const systemGroup =
        new THREE.Group();
    scene.add(
        systemGroup
    );
    const connectionGroup =
        new THREE.Group();
    systemGroup.add(
        connectionGroup
    );
    const nodeGroup =
        new THREE.Group();
    systemGroup.add(
        nodeGroup
    );
    createCore(
        systemGroup
    );
    const nodes =
        createTechnologyNodes(
            nodeGroup,
            technologies
        );
    createConnections(
        connectionGroup,
        nodes
    );
    const pointer =
        new THREE.Vector2();
    const raycaster =
        new THREE.Raycaster();
    setupPointerInteraction(
        container,
        pointer,
        state
    );
    function resize() {
        const width =
            container.clientWidth;
        const height =
            container.clientHeight;
        if (!width || !height) {
            return;
        }
        camera.aspect =
            width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(
            width,
            height,
            false
        );
    }
    resize();
    const resizeObserver =
        new ResizeObserver(
            resize
        );
    resizeObserver.observe(
        container
    );
    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );
    const clock =
        new THREE.Clock();
    let animationFrame;
    function animate() {
        animationFrame =
            requestAnimationFrame(
                animate
            );
        const delta =
            clock.getDelta();
        if (!reducedMotion.matches) {
            state.naturalRotation.x +=
                CONFIG.rotation.x *
                delta *
                60;
            state.naturalRotation.y +=
                CONFIG.rotation.y *
                delta *
                60;
            state.naturalRotation.z +=
                CONFIG.rotation.z *
                delta *
                60;
        }
        if (!reducedMotion.matches) {
            state.mouseCurrent.x +=
                (
                    state.mouseTarget.x -
                    state.mouseCurrent.x
                ) *
                CONFIG.mouse.smoothing;
            state.mouseCurrent.y +=
                (
                    state.mouseTarget.y -
                    state.mouseCurrent.y
                ) *
                CONFIG.mouse.smoothing;
        }
        else {
            state.mouseCurrent.x = 0;
            state.mouseCurrent.y = 0;
        }
        systemGroup.rotation.x =
            state.naturalRotation.x +
            state.mouseCurrent.y *
            CONFIG.mouse.influenceY;
        systemGroup.rotation.y =
            state.naturalRotation.y +
            state.mouseCurrent.x *
            CONFIG.mouse.influenceX;
        systemGroup.rotation.z =
            state.naturalRotation.z;
        nodes.forEach(
            (node) => {
                node.sprite.quaternion.copy(
                    camera.quaternion
                );
                const targetScale =
                    node.sprite ===
                    state.hoveredSprite
                        ? CONFIG.labels.hoverScale
                        : 1;
                const currentScale =
                    node.sprite.scale.x /
                    node.baseWidth;
                const scale =
                    THREE.MathUtils.lerp(
                        currentScale,
                        targetScale,
                        0.12
                    );
                node.sprite.scale.set(
                    node.baseWidth *
                    scale,
                    node.baseHeight *
                    scale,
                    1
                );
            }
        )
        updateHover(
            raycaster,
            pointer,
            camera,
            nodes,
            state
        );
        renderer.render(
            scene,
            camera
        );
    }
    animate();
    function destroy() {
        cancelAnimationFrame(
            animationFrame
        );
        resizeObserver.disconnect();
        container.removeEventListener(
            "pointermove",
            pointerMoveHandler
        );
        container.removeEventListener(
            "pointerleave",
            pointerLeaveHandler
        );
        nodes.forEach(
            (node) => {
                node.node.geometry.dispose();
                node.node.material.dispose();
                node.sprite.material.map?.dispose();
                node.sprite.material.dispose();
            }
        );
        renderer.dispose();
        renderer.domElement.remove();
        delete container._teamCore;
    }
    const pointerMoveHandler =
        createPointerMoveHandler(
            container,
            pointer,
            state
        );
    const pointerLeaveHandler =
        createPointerLeaveHandler(
            state
        );
    container.addEventListener(
        "pointermove",
        pointerMoveHandler
    );
    container.addEventListener(
        "pointerleave",
        pointerLeaveHandler
    );
    container._teamCore = {
        scene,
        camera,
        renderer,
        systemGroup,
        nodes,
        destroy
    };
}

function createCore(
    systemGroup
) {
    const coreGroup =
        new THREE.Group();
    const geometry =
        new THREE.IcosahedronGeometry(
            CONFIG.core.radius,
            CONFIG.core.detail
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
    coreGroup.add(
        core
    );
    const innerGeometry =
        new THREE.IcosahedronGeometry(
            CONFIG.core.radius * 0.78,
            1
        );
    const innerMaterial =
        new THREE.MeshBasicMaterial({
            color:
                CONFIG.colors.coreInner
        });
    const innerCore =
        new THREE.Mesh(
            innerGeometry,
            innerMaterial
        );
    coreGroup.add(
        innerCore
    );
    const wireGeometry =
        new THREE.IcosahedronGeometry(
            CONFIG.core.radius * 1.04,
            CONFIG.core.detail
        );
    const wireMaterial =
        new THREE.MeshBasicMaterial({
            color:
                CONFIG.colors.wireframe,
            wireframe:
                true,
            transparent:
                true,
            opacity:
                0.8
        });
    const wireframe =
        new THREE.Mesh(
            wireGeometry,
            wireMaterial
        );
    coreGroup.add(
        wireframe
    );
    systemGroup.add(
        coreGroup
    );
}

function createTechnologyNodes(
    nodeGroup,
    technologies
) {
    const nodes = [];
    const count =
        technologies.length;
    // Distribución Fibonacci sobre la superficie de la esfera.
    const goldenAngle =
        Math.PI *
        (3 - Math.sqrt(5));
    technologies.forEach(
        (technology, index) => {
            const y =
                1 -
                (
                    (index + 0.5) /
                    count
                ) *
                2;
            const radiusXZ =
                Math.sqrt(
                    1 -
                    y * y
                );
            const theta =
                goldenAngle *
                index;
            const x =
                Math.cos(theta) *
                radiusXZ;
            const z =
                Math.sin(theta) *
                radiusXZ;
            const position =
                new THREE.Vector3(
                    x *
                    CONFIG.sphere.radius,
                    y *
                    CONFIG.sphere.radius,
                    z *
                    CONFIG.sphere.radius
                );
            const nodeGeometry =
                new THREE.SphereGeometry(
                    CONFIG.nodes.radius,
                    8,
                    8
                );
            const nodeMaterial =
                new THREE.MeshBasicMaterial({
                    color:
                        CONFIG.colors.node
                });
            const node =
                new THREE.Mesh(
                    nodeGeometry,
                    nodeMaterial
                );
            node.position.copy(
                position
            );
            nodeGroup.add(
                node
            );
            const sprite =
                createTechnologyLabel(
                    technology
                );
            sprite.position.copy(
                position
            );
            // Separa la etiqueta ligeramente de la superficie de la esfera.
            const direction =
                position
                    .clone()
                    .normalize();
            sprite.position.add(
                direction.multiplyScalar(
                    0.10
                )
            );
            sprite.userData.technology =
                technology;
            nodeGroup.add(
                sprite
            );
            nodes.push({
                technology,
                node,
                sprite,
                position,
                baseWidth:
                    CONFIG.labels.width,
                baseHeight:
                    CONFIG.labels.height
            });
        }
    );
    return nodes;
}

function createTechnologyLabel(
    technology
) {
    const canvas =
        document.createElement(
            "canvas"
        );
    canvas.width =
        CONFIG.labels.canvasWidth;
    canvas.height =
        CONFIG.labels.canvasHeight;
    const context =
        canvas.getContext(
            "2d"
        );
    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    context.font =
        `600 ${CONFIG.labels.fontSize}px Inter, Arial, sans-serif`;
    context.fillStyle =
        "#f2f2f2";
    context.textAlign =
        "center";
    context.textBaseline =
        "middle";
    context.fillText(
        technology,
        canvas.width / 2,
        canvas.height / 2
    );
    const texture =
        new THREE.CanvasTexture(
            canvas
        );
    texture.colorSpace =
        THREE.SRGBColorSpace;
    texture.minFilter =
        THREE.LinearFilter;
    texture.magFilter =
        THREE.LinearFilter;
    texture.needsUpdate =
        true;
    const material =
        new THREE.SpriteMaterial({
            map:
                texture,
            transparent:
                true,
            opacity:
                1,
            depthWrite:
                false,
            depthTest:
                false
        });
    const sprite =
        new THREE.Sprite(
            material
        );
    sprite.scale.set(
        CONFIG.labels.width,
        CONFIG.labels.height,
        1
    );
    return sprite;
}

function createConnections(
    connectionGroup,
    nodes
) {
    if (nodes.length < 2) {
        return;
    }
    const connections = [];
    // Cada tecnología se conecta con sus vecinos más cercanos.
    nodes.forEach(
        (node, index) => {
            const nearest =
                nodes
                    .map(
                        (
                            other,
                            otherIndex

                        ) => {
                            if (
                                index ===
                                otherIndex
                            ) {
                                return null;
                            }
                            return {
                                index:
                                    otherIndex,
                                distance:
                                    node.position.distanceTo(
                                        other.position
                                    )
                            };
                        }
                    )
                    .filter(Boolean)
                    .sort(
                        (a, b) =>
                            a.distance -
                            b.distance
                    );
            nearest
                .slice(
                    0,
                    CONFIG.connections.neighbors
                )
                .forEach(
                    (connection) => {
                        const a =
                            Math.min(
                                index,
                                connection.index
                            );
                        const b =
                            Math.max(
                                index,
                                connection.index
                            );
                        const exists =
                            connections.some(
                                item =>
                                    item.a === a &&
                                    item.b === b
                            );
                        if (exists) {
                            return;
                        }
                        connections.push({
                            a,
                            b
                        });
                    }
                );
        }
    );
    const positions = [];
    connections.forEach(
        (connection) => {
            const start =
                nodes[
                    connection.a
                ].position;
            const end =
                nodes[
                    connection.b
                ].position;
            positions.push(
                start.x,
                start.y,
                start.z,
                end.x,
                end.y,
                end.z
            );
        }
    );
    const geometry =
        new THREE.BufferGeometry();
    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
            positions,
            3
        )
    );
    const material =
        new THREE.LineBasicMaterial({
            color:
                CONFIG.colors.connection,
            transparent:
                true,
            opacity:
                CONFIG.connections.opacity,
            depthWrite:
                false
        });
    const lines =
        new THREE.LineSegments(
            geometry,
            material
        );
    connectionGroup.add(
        lines
    );
}

function createPointerMoveHandler(
    container,
    pointer,
    state

) {
    return function(event) {
        const rect =
            container.getBoundingClientRect();
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
        const x =
            normalizedX * 2 - 1;
        const y =
            normalizedY * 2 - 1;
        // Movimiento horizontal -> rotación Y; movimiento vertical -> rotación X.
        state.mouseTarget.x =
            x;
        state.mouseTarget.y =
            -y;
        pointer.x =
            x;
        pointer.y =
            -y;
        state.pointerInside =
            true;
    };
}

function createPointerLeaveHandler(
    state
) {
    return function() {
        // Restablece la influencia del mouse sin detener la rotación natural.
        state.mouseTarget.x =
            0;
        state.mouseTarget.y =
            0;
        state.pointerInside =
            false;
    };
}

function setupPointerInteraction(
    container,
    pointer,
    state
) {
    const pointerMoveHandler =
        createPointerMoveHandler(
            container,
            pointer,
            state
        );
    const pointerLeaveHandler =
        createPointerLeaveHandler(
            state
        );
    container.addEventListener(
        "pointermove",
        pointerMoveHandler
    );
    container.addEventListener(
        "pointerleave",
        pointerLeaveHandler
    );
}

function updateHover(
    raycaster,
    pointer,
    camera,
    nodes,
    state
) {
    if (!state.pointerInside) {
        state.hoveredSprite =
            null;
        return;
    }
    raycaster.setFromCamera(
        pointer,
        camera
    );
    const sprites =
        nodes.map(
            node => node.sprite
        );
    const intersections =
        raycaster.intersectObjects(
            sprites
        );
    if (!intersections.length) {
        state.hoveredSprite =
            null;
        return;
    }
    state.hoveredSprite =
        intersections[0].object;
}