const bodyBorderColor = document.querySelector('#main');

// hero
const sectionOne = document.querySelector('.hero');
sectionHeroOptions = { rootMargin: '-300px 0px 0px 0px' };

sectionHeroObserver = new IntersectionObserver(
  (entries, sectionHeroObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        bodyBorderColor.classList.add('section-one-scrolled');
      } else {
        bodyBorderColor.classList.remove('section-one-scrolled');
      }
    });
  },
  sectionHeroOptions
);
sectionHeroObserver.observe(sectionOne);

// project section
sectionProjOptions = { rootMargin: '-300px 0px 0px 0px' };
const sectionProject = document.querySelector('.services');
const sectionProjectObserver = new IntersectionObserver((projectView) => {
  projectView.forEach((prj) => {
    if (!prj.isIntersecting) {
      let x = bodyBorderColor.classList.contains('section-one-scrolled');
      if (x) {
        bodyBorderColor.classList.remove('section-one-scrolled');
        bodyBorderColor.classList.add('section-services-scrolled');
      }
    } else {
      bodyBorderColor.classList.remove('section-services-scrolled');
      bodyBorderColor.classList.add('section-one-scrolled');
    }
  });
}, sectionProjOptions);
sectionProjectObserver.observe(sectionProject);

