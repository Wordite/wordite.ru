import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { $section } from '../store/section'
import TouchSweep from 'touchsweep'
import { $menu } from '../store/menu'
import { $scrollTo } from '../store/scrollTo'
import { locomotiveScroll } from './locomotive'
import { $earth } from '../store/earth'


const touchThreshold = 20
const touchSweepInstance = new TouchSweep(window, {}, touchThreshold)



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


let isMobile = window.innerWidth <= 1024
window.addEventListener('resize', () => isMobile = window.innerWidth <= 1024)



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
    firstContainer.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)'

    if (isMobile) {
      secondContainer.style.display = 'block'
      firstContainer.style.transform = `translate3d(0,-140dvh,0)`

      setTimeout(() => {
        firstScreen.style.display = 'none'
        secondContainer.focus()
        secondContainer.click()
        currentSlide = 3
        $section.set(3)
      }, 1000)


      setTimeout(() => {
        secondContainer.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)'
        secondContainer.style.transform = 'translate3d(0,-100dvh,0)'
      }, 20)

      return
    }

    portfolio.style.display = 'block'

    // Animate firstContainer
    firstContainer.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)'
    firstContainer.style.transform = `translate3d(0,${isMobile ? '-140dvh' : '-100vh'},0)`

    setTimeout(() => {
      firstScreen.style.display = 'none'
      currentSlide++
      $section.set(2)
    }, 1000)
  },

  2: () => {
    secondContainer.style.display = 'block'

    // Animate firstContainer
    firstContainer.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)'
    firstContainer.style.transform = `translate3d(0,${isMobile ? '-240vh' : '-200vh'},0)`


    setTimeout(() => {
      portfolio.style.display = 'none'
      secondContainer.focus()
      secondContainer.click()
      currentSlide++
      $section.set(3)
    }, 1000)


    setTimeout(() => {
      secondContainer.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)'
      secondContainer.style.transform = 'translate3d(0,-100vh,0)'
    }, 20)
  },
}

const upHandlers = {
  2: () => {
    firstScreen.style.display = 'block'

    // Animate firstContainer
    firstContainer.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)'
    firstContainer.style.transform = 'translate3d(0,0,0)'

    setTimeout(() => {
      portfolio.style.display = 'none'
      console.log('PORFOLIO DISPLAY NONE')
      currentSlide--
      $section.set(1)
    }, 1000)
    // firstContainer.addEventListener('transitionend', function handler() {
    //   firstContainer.removeEventListener('transitionend', handler)
    //   portfolio.style.display = 'none'
    //   console.log('PORFOLIO DISPLAY NONE')
    //   currentSlide--
    //   $section.set(1)
    // })
  },

  3: () => {
    firstContainer.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)'

    if (isMobile) {
      firstScreen.style.display = 'block'
      firstContainer.style.transform = 'translate3d(0,0,0)'
      console.log('UP HANDLER SCROLL TO FIRST SCREEN')

      setTimeout(() => {
        secondContainer.style.display = 'none'
        currentSlide = 1
        $section.set(1)
      }, 1000)

      secondContainer.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)'
      secondContainer.style.transform = `translate3d(0,100vh,0)`

      return
    }


    portfolio.style.display = 'block'
    firstContainer.style.transform = `translate3d(0,${isMobile ? '-140dvh' : '-100vh'},0)`

    setTimeout(() => {
      secondContainer.style.display = 'none'
      currentSlide--
      $section.set(2)
    }, 1000)

    secondContainer.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)'
    secondContainer.style.transform = `translate3d(0,0,0)`
  },
}

function handleNavigation(e, swipeDirection = null) {
  if ($menu.get() !== 'closed') return
  if (Date.now() - lastScrollTime < 3000) return
  if ($scrollTo.get().isScrolling) return
  if ($earth.get() !== 'ready') return

  resetLastScrollTime()
  const isDown = swipeDirection ? swipeDirection === 'down' : e.deltaY > 0

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
}

function pageScroll() {
  window.addEventListener('wheel', handleNavigation)
  window.addEventListener('swipeup', e => handleNavigation(e, 'down'))
  window.addEventListener('swipedown', e => handleNavigation(e, 'up'))
}






// $profile.listen((profile, oldProfile, changed) => {
//   console.log(`${changed} new value ${profile[changed]}`)
// })


function scrollToPhotos() {
  if (isMobile) {
    if (currentSlide === 1) {
      downHandlers[1]()

      setTimeout(() => locomotiveScroll.scrollTo(document.body.querySelector('#photos')), 1200)
      setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 1700)
    }

    if (currentSlide === 3) {
      locomotiveScroll.scrollTo(document.body.querySelector('#photos'))
      setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 900)
    }

    return
  }


  if (currentSlide === 1) {
    downHandlers[1]()

    setTimeout(() => downHandlers[2](), 2500)
    setTimeout(() => locomotiveScroll.scrollTo(document.body.querySelector('#photos')), 3400)
    setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 5900)
  }

  if (currentSlide === 2) {
    downHandlers[2]()
    setTimeout(() => locomotiveScroll.scrollTo(document.body.querySelector('#photos')), 2500)
    setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 3400)
  }

  if (currentSlide === 3) {
    locomotiveScroll.scrollTo(document.body.querySelector('#photos'))
    setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 900)
  }
}


function scrollToSkills() {
  if (isMobile) {
    if (currentSlide === 1) {
      downHandlers[1]()

      setTimeout(() => locomotiveScroll.scrollTo(document.body.querySelector('#skills')), 1200)
      setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 1700)
    }

    if (currentSlide === 3) {
      locomotiveScroll.scrollTo(document.body.querySelector('#skills'))
      setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 900)
    }

    return
  }


  if (currentSlide === 1) {
    downHandlers[1]()

    setTimeout(() => downHandlers[2](), 2500)
    setTimeout(() => locomotiveScroll.scrollTo(document.body.querySelector('#skills')), 3400)
    setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 5900)
  }

  if (currentSlide === 2) {
    downHandlers[2]()
    setTimeout(() => locomotiveScroll.scrollTo(document.body.querySelector('#skills')), 2500)
    setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 3400)
  }

  if (currentSlide === 3) {
    locomotiveScroll.scrollTo(document.body.querySelector('#skills'))
    setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 900)
  }
}


function scrollToServices() {
  if (isMobile) {
    if (currentSlide === 1) {
      downHandlers[1]()
      setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 1200)
    }

    if (currentSlide === 3) {
      locomotiveScroll.scrollTo(document.body.querySelector('#services'))
      setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 900)
    }

    return
  }


  if (currentSlide === 1) {
    downHandlers[1]()

    setTimeout(() => downHandlers[2](), 2500)
    setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 4000)
  }

  if (currentSlide === 2) {
    downHandlers[2]()
    setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 2500)
  }

  if (currentSlide === 3) {
    locomotiveScroll.scrollTo(document.body.querySelector('#services'))
    setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 900)
  }
}




function scrollToFirstScreen() {
  if (isMobile) {
    if (currentSlide === 3) {
      locomotiveScroll.scrollTo(document.body.querySelector('#services'))

      setTimeout(() => upHandlers[3](), 500)
      setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 1700)
    }

    if (currentSlide === 1) setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 500)

    return
  }

  if (currentSlide === 1) setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 500)

  if (currentSlide === 2) {
    upHandlers[2]()
    setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 2500)
  }

  if (currentSlide === 3) {
    locomotiveScroll.scrollTo(document.body.querySelector('#services'))

    setTimeout(() => upHandlers[3](), 900)
    setTimeout(() => upHandlers[2](), 3400)
    setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 5900)
  }
}



function scrollToPortfolio() {
  if (isMobile) return


  if (currentSlide === 2) setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 500)

  if (currentSlide === 1) {
    downHandlers[1]()
    setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 2500)
  }

  if (currentSlide === 3) {
    locomotiveScroll.scrollTo(document.body.querySelector('#services'))
    setTimeout(() => upHandlers[3](), 900)
    setTimeout(() => $scrollTo.set({ isScrolling: false, target: null }), 3400)
  }
}



$scrollTo.listen((scrollTo, oldScrollTo, changed) => {
  if (changed === 'target') $scrollTo.setKey('isScrolling', true)

  if (!scrollTo.isScrolling && scrollTo.target === 'services') scrollToServices()
  if (!scrollTo.isScrolling && scrollTo.target === 'portfolio') scrollToPortfolio()
  if (!scrollTo.isScrolling && scrollTo.target === 'skills') scrollToSkills()
  if (!scrollTo.isScrolling && scrollTo.target === 'photos') scrollToPhotos()
  if (!scrollTo.isScrolling && scrollTo.target === 'hero') scrollToFirstScreen()

})




export default pageScroll
