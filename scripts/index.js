document.addEventListener("readystatechange", (e) => {
    if (e.target.readyState === "complete") {
        changeHeaderBgColor();
    }
});

const changeHeaderBgColor = () => {
    window.addEventListener("scroll", () => {
        const detectSrollingY = window.scrollY;
        const headerBackground = document.querySelector(".header");

        if (detectSrollingY > 10) {
            headerBackground.classList.add("scrolled-y");
        } else if (detectSrollingY < 10) {
            headerBackground.classList.remove("scrolled-y");
        }
    });
};