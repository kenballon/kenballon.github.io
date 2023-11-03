import { lerp } from "./utils.js";
import RevealImageOnHover from "./RevealImageOnHover.js";

document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "complete") {
    smoothScrolling();
    videoScale();
    blobMouseFollow();
    startSplitChar();
    const imgRevealOnHover = new RevealImageOnHover(
      ".projects-ul-list",
      ".proj-preview-container",
      ".preview-img"
    );
  }
});

gsap.registerPlugin(ScrollTrigger);

const smoothScrolling = () => {
  const lenis = new Lenis();

  lenis.on("scroll", (e) => {});

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
};

const videoScale = () => {
  const video = document.querySelector("#video-player");
  const videoSection = document.querySelector("#video-section");

  window.addEventListener("scroll", () => {
    animateVideo();
  });

  function animateVideo() {
    let { bottom } = videoSection.getBoundingClientRect();

    let scale = 1 - (bottom - window.innerHeight) * 0.0005;
    scale = scale < 0.2 ? 0.2 : scale > 1 ? 1 : scale;
    video.style.transform = `scale(${scale})`;
  }
};

const blobMouseFollow = () => {
  const mouseBlob = document.getElementById("mouse-follow-blob");

  const handleMouseMove = (e) => {
    const { clientY, clientX } = e;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    mouseBlob.animate(
      {
        left: `${clientX + scrollX}px`,
        top: `${clientY + scrollY}px`,
      },
      { duration: 3000, fill: "forwards" }
    );
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("wheel", handleMouseMove);
};

function startSplitChar() {
  const charSplit = document.querySelectorAll(".split-heading");
  let text;

  charSplit.forEach((char) => {
    text = new SplitType(char, { types: "lines,chars" });

    gsap.from(text.chars, {
      scrollTrigger: {
        trigger: char,
        start: "top 70%",
        end: "top 25%",
        scrub: true,
      },
      opacity: 0.1,
      stagger: 0.1,
    });
  });
}

function startSplitWords() {
  const wordSplit = document.querySelectorAll(".split-heading-word");

  wordSplit.forEach((words) => {
    let char = new SplitType(words, { types: "lines,words" });

    gsap.from(char.words, {
      y: "100%",
      stagger: 0.3,
    });
  });
}

window.addEventListener("resize", () => {
  startSplitChar();
  startSplitWords();
});

startSplitWords();

function fireClick() {
  function isMouseInsidePage() {
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;
    return (
      mouseX >= 0 && mouseY >= 0 && mouseX <= pageWidth && mouseY <= pageHeight
    );
  }

  function simulateClick() {
    if (isMouseInsidePage()) {
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      const element = document.elementFromPoint(mouseX, mouseY); // Get the element at the current mouse position
      if (element) {
        element.dispatchEvent(event);
      }
      const currentTime = new Date().toLocaleTimeString();
      console.log(
        `Simulated click at (${mouseX}, ${mouseY}) at ${currentTime}`
      );
    }
  }

  let mouseX = 0;
  let mouseY = 0;

  // Log mouse position and time every 5 seconds
  setInterval(() => {
    if (isMouseInsidePage()) {
      const currentTime = new Date().toLocaleTimeString();
      console.log(`Mouse position: (${mouseX}, ${mouseY}) at ${currentTime}`);
    }
  }, 20000);

  // Track mouse position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Simulate a click every 5 seconds if the mouse is inside the page
  setInterval(simulateClick, 20000);
}

// fireClick();
