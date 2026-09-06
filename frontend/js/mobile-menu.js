const siteHeader = document.querySelector(".site-header");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileNavigation = document.querySelector("#mobile-navigation");

if (
    siteHeader &&
    mobileMenuToggle &&
    mobileNavigation
) {
    let isMenuOpen = false;
    const openMenu = () => {
        if (isMenuOpen) {
            return;
        }
        isMenuOpen = true;
        siteHeader.classList.add("is-menu-open");
        mobileMenuToggle.classList.add("is-active");
        mobileMenuToggle.setAttribute(
            "aria-expanded",
            "true"
        );
        mobileMenuToggle.setAttribute(
            "aria-label",
            "Cerrar menú"
        );
        document.body.style.overflow = "hidden";
    };
    const closeMenu = () => {
        if (!isMenuOpen) {
            return;
        }
        isMenuOpen = false;
        siteHeader.classList.remove("is-menu-open");
        mobileMenuToggle.classList.remove("is-active");
        mobileMenuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
        mobileMenuToggle.setAttribute(
            "aria-label",
            "Abrir menú"
        );
        document.body.style.overflow = "";
    };
    const toggleMenu = () => {
        if (isMenuOpen) {
            closeMenu();
            return;
        }
        openMenu();
    };
    mobileMenuToggle.addEventListener(
        "click",
        toggleMenu
    );
    const navigationLinks =
        mobileNavigation.querySelectorAll(
            ".navigation-link"
        );

    navigationLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });
    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Escape" &&
                isMenuOpen
            ) {
                closeMenu();
                mobileMenuToggle.focus();
            }
        }
    );
    const mobileMediaQuery =
        window.matchMedia("(max-width: 767px)");
    const handleViewportChange = (event) => {
        if (!event.matches) {
            closeMenu();
        }
    };
    mobileMediaQuery.addEventListener(
        "change",
        handleViewportChange
    );
    closeMenu();
}
