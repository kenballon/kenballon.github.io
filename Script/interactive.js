const bodyBorderColor = document.querySelector('#main')
const sectionOne = document.querySelector('.hero');
const sectionServices = document.querySelector('#services-id')

sectionHeroOptions = {
    rootMargin: "-200px 0px 0px 0px"
};

sectionHeroObserver = new IntersectionObserver((entries, sectionHeroObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            bodyBorderColor.classList.add('section-one-scrolled');
        } else {
            bodyBorderColor.classList.remove('section-one-scrolled');
        }
    });
}, sectionHeroOptions)

sectionHeroObserver.observe(sectionOne);