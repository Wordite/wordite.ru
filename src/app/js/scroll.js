import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { $section } from '../store/section'

gsap.registerPlugin(ScrollTrigger, useGSAP)

gsap.config({
  force3D: true,
})

const elements = document.querySelectorAll('.section')

let screenHeight = document.documentElement.clientHeight
const firstContainer = elements[0]
const secondContainer = elements[1]

const [firstScreen, portfolio] = firstContainer.querySelectorAll('section .section_content')

let currentSlide = 1
let lastScrollTime = 0

const resetLastScrollTime = () => {
  lastScrollTime = Date.now()
}

// const downHandlers = {
//   1: () => {
//     portfolio.style.display = 'block'

//     gsap.to(firstContainer, {
//       //   y: -screenHeight,
//       transform: 'translate3d(0,-100vh,0)',
//       duration: 1,
//       invalidateOnRefresh: true,
//       ease: 'power2.inOut',
//       onComplete: () => {
//         firstScreen.style.display = 'none'
//         currentSlide++
//         $section.set(2)
//       },
//     })
//   },

//   2: () => {
//     secondContainer.style.display = 'block'

//     gsap.to(firstContainer, {
//       //   y: -screenHeight * 2,
//       transform: 'translate3d(0,-200vh,0)',
//       duration: 1,
//       ease: 'power2.inOut',
//       invalidateOnRefresh: true,
//       onComplete: () => {
//         portfolio.style.display = 'none'

//         secondContainer.focus()
//         secondContainer.click()

//         currentSlide++
//         $section.set(3)
//       },
//     })

//     gsap.to(secondContainer, {
//       //   y: -screenHeight,
//       transform: 'translate3d(0,-100vh,0)',
//       duration: 1,
//       ease: 'power2.inOut',
//     })
//   },
// }

// const upHandlers = {
//   2: () => {
//     firstScreen.style.display = 'block'

//     gsap.to(firstContainer, {
//       y: 0,
//       duration: 1,
//       invalidateOnRefresh: true,
//       ease: 'power2.inOut',
//       onComplete: () => {
//         portfolio.style.display = 'none'
//         currentSlide--
//         $section.set(1)
//       },
//     })
//   },

//   3: () => {
//     portfolio.style.display = 'block'

//     gsap.to(firstContainer, {
//       y: -screenHeight,
//       duration: 1,
//       ease: 'none',
//       invalidateOnRefresh: true,
//       onComplete: () => {
//         secondContainer.style.display = 'none'
//         currentSlide--
//         $section.set(2)
//       },
//     })

//     gsap.to(secondContainer, {
//       y: screenHeight,
//       duration: 1,
//       ease: 'power2.inOut',
//       invalidateOnRefresh: true,
//     })
//   },
// }

const downHandlers = {
  1: () => {
    portfolio.style.display = 'block'

    // Animate firstContainer
    firstContainer.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)'
    firstContainer.style.transform = 'translate3d(0,-100vh,0)'

    firstContainer.addEventListener('transitionend', function handler() {
      firstContainer.removeEventListener('transitionend', handler)
      firstScreen.style.display = 'none'
      currentSlide++
      $section.set(2)
    })
  },

  2: () => {
    secondContainer.style.display = 'block'

    // Animate firstContainer
    firstContainer.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)'
    firstContainer.style.transform = 'translate3d(0,-200vh,0)'

    firstContainer.addEventListener('transitionend', function handler() {
      firstContainer.removeEventListener('transitionend', handler)
      portfolio.style.display = 'none'
      secondContainer.focus()
      secondContainer.click()
      currentSlide++
      $section.set(3)
    })

    // Animate secondContainer
    secondContainer.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)'
    secondContainer.style.transform = 'translate3d(0,-100vh,0)'
  },
}

const upHandlers = {
  2: () => {
    firstScreen.style.display = 'block'

    // Animate firstContainer
    firstContainer.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)'
    firstContainer.style.transform = 'translate3d(0,0,0)'

    firstContainer.addEventListener('transitionend', function handler() {
      firstContainer.removeEventListener('transitionend', handler)
      portfolio.style.display = 'none'
      currentSlide--
      $section.set(1)
    })
  },

  3: () => {
    portfolio.style.display = 'block'

    // Animate firstContainer
    firstContainer.style.transition = 'transform 1s linear'
    firstContainer.style.transform = `translate3d(0,-100vh,0)`

    firstContainer.addEventListener('transitionend', function handler() {
      firstContainer.removeEventListener('transitionend', handler)
      secondContainer.style.display = 'none'
      currentSlide--
      $section.set(2)
    })

    // Animate secondContainer
    secondContainer.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)'
    secondContainer.style.transform = `translate3d(0,0,0)`
  },
}

function pageScroll() {
  window.addEventListener('wheel', (e) => {
    if (Date.now() - lastScrollTime < 3000) return
    resetLastScrollTime()

    const isDown = e.deltaY > 0

    if (isDown) {
      if (currentSlide === 1) {
        downHandlers[1]()
      }

      if (currentSlide === 2) {
        downHandlers[2]()
      }
    } else {
      if (currentSlide === 2) {
        upHandlers[2]()
      }

      if (currentSlide === 3 && secondContainer.scrollTop < 10) {
        upHandlers[3]()
      }
    }
  })
}

export default pageScroll
