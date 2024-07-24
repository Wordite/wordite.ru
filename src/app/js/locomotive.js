import LocomotiveScroll from 'locomotive-scroll'



const container = document.body.querySelector('#home') ? document.body.querySelector('.scrollable_container') : document.body.querySelector('.wordite_page_container')

export const locomotiveScroll = new LocomotiveScroll({
  lenisOptions: {
    wrapper: container,
    // content: document.documentElement,
    // lerp: 0.1,
    duration: 1.7,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    smoothTouch: true,
    // wheelMultiplier: 1,
    // touchMultiplier: 2,
    // normalizeWheel: true,
    // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  },
})

