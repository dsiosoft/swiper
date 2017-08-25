export default function () {
  const swiper = this;

  const { params, el, allowSlideNext, allowSlidePrev } = swiper;

  if (el && el.offsetWidth === 0) return;

  // Breakpoints
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }

  // Disable locks on resize
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;

  swiper.updateSize();
  swiper.updateSlides();

  let slideChangedBySlideTo = false;
  if (params.freeMode) {
    const newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
    swiper.setTranslate(newTranslate);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
    swiper.updateRealIndex();

    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
  } else {
    swiper.updateSlidesClasses();
    if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
      slideChangedBySlideTo = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      slideChangedBySlideTo = swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  // if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
  //   s.lazy.load();
  // }
  // Return locks after resize
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  // if (s.params.onAfterResize) s.params.onAfterResize(s);
}
