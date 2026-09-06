const pageLoader =
    document.querySelector(
        "#page-loader"
    );

if (pageLoader) {

    const core =
        pageLoader.querySelector(
            ".page-loader__core"
        );

    const panels =
        pageLoader.querySelectorAll(
            ".page-loader__panel"
        );

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


const CONFIG = {
    minimumDisplayTime: 1600,
    coreDelay: 200,
    gridDelay: 500,
    metadataDelay: 750,
    revealDelay: 1500,
    revealDuration: 1600,
    cleanupDelay: 1900
}

    const startTime =
        performance.now();


    function wait(milliseconds) {

        return new Promise(
            resolve => {

                window.setTimeout(
                    resolve,
                    milliseconds
                );
            }
        );
    }


    function getRemainingTime() {

        const elapsed =
            performance.now() -
            startTime;

        return Math.max(
            CONFIG.minimumDisplayTime -
            elapsed,
            0
        );
    }


    function removeLoader() {

        if (!pageLoader) {
            return;
        }

        pageLoader.remove();
    }


    function revealPanels() {

        pageLoader.classList.add(
            "is-revealing"
        );

        panels.forEach(
            (panel, index) => {

                const delay =
                    index * 45;

                panel.style.transitionDelay =
                    `${delay}ms`;
            }
        );
    }


    async function initializeLoader() {

        if (prefersReducedMotion) {

            removeLoader();

            return;
        }


        await wait(
            CONFIG.coreDelay
        );


        pageLoader.classList.add(
            "is-initialized"
        );


        await wait(
            CONFIG.gridDelay -
            CONFIG.coreDelay
        );


        pageLoader.classList.add(
            "is-grid-active"
        );


        await wait(
            CONFIG.metadataDelay -
            CONFIG.gridDelay
        );


        pageLoader.classList.add(
            "is-metadata-active"
        );


        await wait(
            CONFIG.revealDelay -
            CONFIG.metadataDelay
        );


        revealPanels();


        await wait(
            CONFIG.cleanupDelay -
            CONFIG.revealDelay
        );


        const remainingTime =
            getRemainingTime();


        if (
            remainingTime > 0
        ) {

            await wait(
                remainingTime
            );
        }


        removeLoader();
    }


    function handlePageReady() {

        initializeLoader();
    }


    if (
        document.readyState ===
        "complete"
    ) {

        handlePageReady();

    }
    else {

        window.addEventListener(
            "load",
            handlePageReady,
            {
                once: true
            }
        );
    }
}