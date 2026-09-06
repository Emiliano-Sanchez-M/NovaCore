const revealElements = document.querySelectorAll("[data-reveal]");
if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -5% 0px"
        }
    );
    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}
window.addEventListener("load", () => {
    document.documentElement.classList.add("is-loaded");

});