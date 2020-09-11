const bodyBorderColor = document.querySelector('#main')
const sectionOne = document.querySelectorAll('section');
const sectionServices = document.querySelector('#services-id')

sectionHeroOptions = {
    rootMargin: "-200px 0px 0px 0px"
};

sectionHeroObserver = new IntersectionObserver((entries, sectionHeroObserver) => {
    entries.forEach(entry => {
      
        if (!entry.isIntersecting) {
            bodyBorderColor.classList.toggle('section-one-scrolled');
        } 
       
    });
}, sectionHeroOptions)
sectionOne.forEach(section =>{
    sectionHeroObserver.observe(section);
});
