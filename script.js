let swiperInstance = null;
let currentMode = null;

function destroySwiperCompletely() {
if (swiperInstance) {
  swiperInstance.destroy(true, true); 
  swiperInstance = null;
}
}
function getActualWidth() {
  return window.visualViewport?.width || window.innerWidth || document.documentElement.clientWidth;
}

function setupDesktopMode() {
  const wrapper = document.querySelector('.swiper-wrapper');
  if (wrapper) {
      wrapper.classList.add("custom-desktop")
  }
  
  const slides = document.querySelectorAll('.swiper-slide');
  slides.forEach(slide => {
    slide.classList.add('custom-desktop');
  });
  
  const pagination = document.querySelector('.swiper-pagination');
  if (pagination) {
    pagination.style.display = 'none';
  }
  
  currentMode = 'desktop';
}

function setupMobileMode() {
  const container = document.querySelector('.swiper');
  if (container) {
      container.classList.add('custom-mobile')
  }
  
  const wrapper = document.querySelector('.swiper-wrapper');
  if (wrapper) {
      wrapper.classList.add('custom-mobile')
  }
  
  const slides = document.querySelectorAll('.swiper-slide');
  slides.forEach(slide => {
      slide.classList.add('custom-mobile');
  });
  
  const pagination = document.querySelector('.swiper-pagination');
  if (pagination) {
      pagination.classList.add('custom-mobile');
    }
  
  currentMode = 'mobile';
}

function initSwiperIfMobile() {
  const windowWidth = getActualWidth();
  const isMobile = windowWidth <= 767;
  

  
  if ((isMobile && currentMode === 'mobile') || (!isMobile && currentMode === 'desktop')) {
    return;
  }
  
  if (isMobile) {
    
    destroySwiperCompletely();
    
    setupMobileMode();
  
    swiperInstance = new Swiper('.swiper', {
      slidesPerView: 'auto',
      direction: 'horizontal',
      spaceBetween: 0,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });
    
    currentMode = 'mobile';
  } 
  else {
    
    destroySwiperCompletely();
    
    setupDesktopMode();
    
    currentMode = 'desktop';
  }
}

let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    initSwiperIfMobile();
  }, 100);
}

window.addEventListener('load', () => {
  initSwiperIfMobile();
  window.addEventListener('orientationchange', handleResize);
});
window.addEventListener('resize', handleResize);

initSwiperIfMobile();

//кнопка читать далее
const swiper = document.getElementById('swiper');
const button = document.getElementById('toggleButton');

  button.addEventListener('click', function() {
    swiper.classList.toggle('swiper-expanded');
    button.classList.toggle('active');

    if (swiper.classList.contains('swiper-expanded')) {
      button.textContent = 'Скрыть';
    } 
    else {
      button.textContent = 'Показать все'
    }
  });
