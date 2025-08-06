let swiperInstance = null;

function destroySwiperCompletely() {
  if (swiperInstance) {
    console.log('🔥 Начинаю уничтожение Swiper');
    swiperInstance.destroy(true, true);
    swiperInstance = null;
    
    const slides = document.querySelectorAll('.swiper-slide');
    console.log(`🔄 Восстанавливаю ${slides.length} слайдов`);
    slides.forEach(slide => {
      slide.style.width = '';
      slide.style.height = '';
      slide.style.flexShrink = '';
    });
    
    const container = document.querySelector('.swiper');
    if (container) {
      container.style.overflow = '';
      container.style.transform = '';
      container.classList.remove('swiper-initialized', 'swiper-horizontal');
      console.log('✅ Контейнер восстановлен');
    }
    
    const pagination = document.querySelector('.swiper-pagination');
    if (pagination) {
      pagination.style.display = 'none';
      console.log('❌ Пагинация скрыта');
    }
    console.log('🛑 Swiper полностью уничтожен');
  } else {
    console.log('ℹ️ Нет активного экземпляра Swiper для уничтожения');
  }
}

function getActualWidth() {
  const width = window.visualViewport?.width || window.innerWidth || document.documentElement.clientWidth;
  console.log(`📏 Определение ширины: 
  visualViewport: ${window.visualViewport?.width} 
  innerWidth: ${window.innerWidth} 
  clientWidth: ${document.documentElement.clientWidth}
  Итог: ${width}`);
  return width;
}

function initSwiperIfMobile() {
  const windowWidth = getActualWidth();
  const isMobile = windowWidth <= 768;
  console.log(`📱 Состояние: ${windowWidth}px, ${isMobile ? 'Мобильный режим' : 'Десктопный режим'}`);

  // Уничтожаем Swiper при переходе в десктопный режим
  if (!isMobile && swiperInstance) {
    console.log('🖥️ Обнаружен переход в десктопный режим');
    destroySwiperCompletely();
  }
  // Или если остались артефакты Swiper в мобильном режиме
  else if (isMobile && windowWidth > 768 && swiperInstance) {
    console.log('⚠️ Обнаружена рассинхронизация режимов');
    destroySwiperCompletely();
  }

  // Создаем Swiper только если нужно
  if (isMobile && !swiperInstance) {
    console.log('📱 Инициализация нового Swiper');
    
    swiperInstance = new Swiper('.swiper', {
      slidesPerView: 'auto',
      direction: 'horizontal',
      spaceBetween: 0,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      on: {
        init: function() {
          console.log('🎉 Swiper инициализирован');
        }
      }
    });

    document.querySelectorAll('.swiper-slide').forEach(slide => {
      slide.style.width = '240px';
      slide.style.height = '72px';
    });

    const pagination = document.querySelector('.swiper-pagination');
    if (pagination) {
      pagination.style.display = 'flex';
      console.log('🔘 Пагинация активирована');
    }
  }
}

let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    console.log('\n=== НОВЫЙ РЕСАЙЗ ===');
    initSwiperIfMobile();
  }, 100);
}

// Инициализация
console.log('🚀 Запуск приложения');
window.addEventListener('load', initSwiperIfMobile);
window.addEventListener('resize', handleResize);

// Первый запуск
initSwiperIfMobile();