class RevealImageOnHover {
  constructor(projectParentList, projectViewContainer, projectSpriteImage) {
    this.projectListContainer = document.querySelector(projectParentList);
    this.previewContainer = document.querySelector(projectViewContainer);
    this.previewImg = document.querySelector(projectSpriteImage);
    this.isInside = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.bgPositions = {
      p1: "0 0",
      p2: "0 25%",
      p3: "0 50%",
      p4: "0 75%",
      p5: "0 100%",
    };

    Array.from(this.projectListContainer.children).forEach((project) => {
      project.addEventListener("mousemove", this.moveProject.bind(this));
      project.addEventListener(
        "mousemove",
        this.moveProjectImg.bind(this, project)
      );
    });

    window.addEventListener("mousemove", (e) => {
      this.moveStuff(e);
      this.moveProject(e);
    });

    window.addEventListener("wheel", (e) => {
      this.moveStuff(e);
      this.moveProject(e);
    });
  }

  moveStuff(e) {
    const mouseInside = this.isMouseInsideContainer(e);

    if (mouseInside !== this.isInside) {
      this.isInside = mouseInside;

      if (this.isInside) {
        gsap.to(this.previewContainer, 0.3, {
          width: "300px",
          height: "300px",
          scale: 1,
          transformOrigin: "center center",
        });
      } else {
        gsap.to(this.previewContainer, 0.3, {
          width: 0,
          height: 0,
          scale: 0,
          transformOrigin: "center center",
        });
      }
    }
  }

  isMouseInsideContainer(e) {
    const projectListRect = this.projectListContainer.getBoundingClientRect();

    const x = e.clientX;
    const y = e.clientY;

    return (
      x >= projectListRect.left &&
      x <= projectListRect.right &&
      y >= projectListRect.top &&
      y <= projectListRect.bottom
    );
  }

  moveProject(event) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    const previewRect = this.previewContainer.getBoundingClientRect();

    const centerX = this.mouseX - previewRect.width / 2;
    const centerY = this.mouseY - previewRect.height / 2;

    this.previewContainer.style.left = centerX + "px";
    this.previewContainer.style.top = centerY + "px";
  }

  moveProjectImg(project) {
    const projectId = project.id;
    gsap.to(this.previewImg, 0.4, {
      backgroundPosition: this.bgPositions[projectId] || "0 0",
    });
  }
}

export default RevealImageOnHover;
