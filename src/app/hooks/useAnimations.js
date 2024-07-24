import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useState } from 'react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

gsap.config({
  force3D: true,
})

// let isMobile = window.innerWidth <= 768
// window.addEventListener('resize', () => isMobile = window.innerWidth <= 768)

function useAnimations(isUseState = false) {
  let cleaners = {}
  let setCleaners = null

  if (isUseState) {
    ;[cleaners, setCleaners] = useState({})
  }

  return {
    block({ selector, direction = 'x', startOffset = -40, endOffset = 0, delay = 0, duration = 0.2, opacity = 0, ease = 'none', onComplete = () => {} }) {
      startOffset = startOffset.toString().includes('%') ? startOffset : startOffset / 20 + 'rem'
      endOffset = endOffset === 0 ? 0 : endOffset / 20 + 'rem'

      const animate = () => {
        gsap.fromTo(
          selector,
          {
            [direction]: startOffset,
            opacity,
          },
          {
            [direction]: endOffset,
            opacity: 1,
            delay,
            duration,
            ease,
            onComplete,
          }
        )
      }

      animate()

      const reset = () => {
        gsap.to(selector, {
          [direction]: startOffset,
          opacity,
          duration: 0,
        })
      }

      if (isUseState) setCleaners((cleaners) => ({ ...cleaners, [selector]: reset }))
      else cleaners[selector] = reset
    },

    blockChildren({ selector, direction = 'x', startOffset = -40, endOffset = 0, stagger = 0.06, delay = 0, duration = 0.2, ease = 'none', onComplete = () => {} }) {
      startOffset = startOffset.toString().includes('%') ? startOffset : startOffset / 20 + 'rem'
      endOffset = endOffset === 0 ? 0 : endOffset / 20 + 'rem'

      const animate = () => {
        gsap.fromTo(
          selector,
          {
            [direction]: startOffset,
            opacity: 0,
          },
          {
            [direction]: endOffset,
            opacity: 1,
            delay,
            duration,
            ease,
            onComplete,
            stagger,
          }
        )
      }

      animate()

      const reset = () => {
        gsap.to(selector, {
          [direction]: startOffset,
          opacity: 0,
          duration: 0,
          stagger: 0,
        })
      }

      if (isUseState) setCleaners((cleaners) => ({ ...cleaners, [selector]: reset }))
      else cleaners[selector] = reset
    },

    class({ selector, className, delay = 0, isForChildren = false, stagger = 0 }) {
      const selectorString = selector

      if (typeof selector === 'string') {
        selector = isForChildren ? document.body.querySelectorAll(selector) : document.body.querySelector(selector)
      }

      if (!isForChildren) {
        setTimeout(() => selector.classList.add(className), delay)
      } else {
        selector = Array.from(selector)

        selector.forEach((el, i) => {
          setTimeout(() => el.classList.add(className), delay + stagger * i)
        })
      }

      const reset = () => {
        if (isForChildren) {
          selector.forEach((el) => el.classList.remove(className))
        } else {
          selector.classList.remove(className)
        }
      }

      if (isUseState) setCleaners((cleaners) => ({ ...cleaners, [selectorString]: reset }))
      else cleaners[selectorString] = reset
    },

    menuSectionOpen(selector = '.menu_section', delay = 0) {
      const animate = () => {
        gsap.fromTo(
          '.menu_section',
          {
            width: 0,
            opacity: 0,
          },
          {
            width: Math.ceil(100 / 6) + '%',
            opacity: 1,
            delay,
            duration: 0.3,
            ease: 'power1.inOut',
            stagger: 0.1,
          }
        )

        gsap.fromTo(
          selector + ' .menu_section_line',
          {
            height: 0,
          },
          {
            height: '100%',
            duration: 0.8,
            ease: 'power1.inOut',
            stagger: 0.1,
            delay: 0.3,
          }
        )

        // gsap.fromTo(
        //   selector + ' .menu_section_title',
        //   {
        //     opacity: 0,
        //     y: -60,
        //   },
        //   {
        //     y: 0,
        //     opacity: 1,
        //     duration: 0.5,
        //     ease: 'power1.inOut',
        //     delay: 0.3,
        //     stagger: 0.1,
        //   }
        // )

        Array.from(document.body.querySelectorAll('.menu_section_title')).map((el, i) => setTimeout(() => el.classList.add('active'), i * 100 + 300))

        gsap.fromTo(
          '.menu_home',
          {
            opacity: 0,
            y: -60,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power1.inOut',
            delay: 0.3,
          }
        )

        gsap.fromTo(
          '.menu_head_title',
          {
            opacity: 0,
            y: -60,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power1.inOut',
            delay: 0.35,
          }
        )

        gsap.fromTo(
          selector + ' .menu_section_arrow',
          {
            opacity: 0,
            y: 100,
          },
          {
            duration: 0.35,
            ease: 'power1.out',
            stagger: 0.08,
            delay: 0.9,
            y: 0,
            opacity: 1,
          }
        )
      }

      animate()
    },

    menuSectionClose(onComplete, width = window.innerWidth / 6, delay = 0) {
      const animate = () => {
        gsap.fromTo(
          '.menu_section',
          {
            width,
            opacity: 1,
          },
          {
            width: 0,
            // opacity: 0,
            stagger: -0.1,
            duration: 0.2,
            ease: 'power1.inOut',
            onComplete,
          }
        )

        // gsap.fromTo(
        //   '.menu_section_title',
        //   {
        //     opacity: 1,
        //     y: 0,
        //   },
        //   {
        //     y: -60,
        //     opacity: 0,
        //     duration: 0,
        //     delay: 1.25,
        //     stagger: 0,
        //   }
        // )

        // document.body.querySelector('.menu_section_title').classList.remove('active')
        Array.from(document.body.querySelectorAll('.menu_section_title')).map((el, i) => setTimeout(() => el.classList.remove('active'), i * 50))

        gsap.fromTo(
          '.menu_home',
          {
            opacity: 1,
            y: 0,
          },
          {
            y: -60,
            opacity: 0,
            duration: 0.2,
            ease: 'power1.inOut',
          }
        )

        gsap.fromTo(
          '.menu_head_title',
          {
            opacity: 1,
            y: 0,
          },
          {
            y: -60,
            opacity: 0,
            duration: 0.2,
            ease: 'power1.inOut',
            delay: 0.1,
          }
        )
      }

      animate()
    },

    loader(onComplete) {
      gsap.fromTo(
        '.loader_title span',
        {
          opacity: 0,
          y: -25 / 20 + 'rem',
        },
        {
          delay: 0.5,
          opacity: 1,
          y: 0,
          stagger: {
            amount: 0.6,
          },
          onComplete,
        }
      )

      // gsap.fromTo(
      //   '.loader',
      //   {
      //     opacity: 1,
      //   },
      //   {
      //     opacity: 0,
      //     duration: .4,
      //     delay: 2,
      //     onComplete: () => {
      //       onComplete()
      //     }
      //   }
      // )
    },

    earth() {
      gsap.fromTo(
        '.earth',
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 3,
        }
      )
    },

    closeLoader(onComplete) {
      gsap.fromTo(
        '.loader_background',
        {
          width: window.innerWidth / 6,
        },
        {
          width: 0,
          stagger: -0.15,
          duration: 0.3,
          onComplete,
        }
      )

      gsap.fromTo(
        '.loader_title span',
        {
          opacity: 1,
          y: 0,
        },
        {
          delay: 0.1,
          opacity: 0,
          y: -20,
          stagger: {
            amount: -0.05,
          },
        }
      )
    },

    mobileMenuSectionOpen(selector = '.mobile_menu', delay = 0) {
      const animate = () => {
        gsap.fromTo(
          '.mobile_menu_background',
          {
            height: 0,
            opacity: 0,
          },
          {
            height: Math.ceil(100 / 6) + '%',
            opacity: 1,
            delay,
            duration: 0.3,
            ease: 'power1.inOut',
            stagger: 0.1,
          }
        )

        gsap.fromTo(
          '.mobile_menu_links li',
          {
            opacity: 0,
            x: -30,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.35,
            ease: 'power1.inOut',
            delay: 0.3,
            stagger: 0.1,
          }
        )

        gsap.fromTo(
          '.mobile_menu_title',
          {
            opacity: 0,
            y: -30,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: 'power1.inOut',
            delay: 0.3,
          }
        )

        gsap.fromTo(
          '.mobile_menu_languageLinks a',
          {
            opacity: 0,
            x: 30,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.35,
            ease: 'power1.inOut',
            delay: 0.3,
            stagger: 0.1,
          }
        )

        gsap.fromTo(
          '.mobile_menu_social',
          {
            opacity: 0,
            y: 30,
          },
          {
            y: '-50%',
            opacity: 1,
            duration: 0.35,
            ease: 'power1.inOut',
            delay: 0.65,
            stagger: 0.1,
          }
        )
      }

      animate()
    },

    mobileMenuSectionClose(onComplete, delay = 0) {
      const animate = () => {
        gsap.fromTo(
          '.mobile_menu_background',
          {
            height: Math.ceil(100 / 6) + '%',
            opacity: 1,
          },
          {
            height: 0,
            opacity: 0,
            delay: .5,
            duration: 0.3,
            ease: 'power1.inOut',
            stagger: -0.1,
            onComplete,
          }
        )

        gsap.fromTo(
          '.mobile_menu_links li',
          {
            opacity: 1,
            x: 0,
          },
          {
            x: -30,
            opacity: 0,
            duration: 0.35,
            ease: 'power1.inOut',
            delay: 0,
            stagger: -0.1,
          }
        )

        gsap.fromTo(
          '.mobile_menu_title',
          {
            opacity: 1,
            y: 0,
          },
          {
            y: -30,
            opacity: 0,
            duration: 0.35,
            ease: 'power1.inOut',
            delay: 0,
          }
        )

        gsap.fromTo(
          '.mobile_menu_languageLinks a',
          {
            opacity: 1,
            x: 0,
          },
          {
            x: 30,
            opacity: 0,
            duration: 0.35,
            ease: 'power1.inOut',
            delay: 0,
            stagger: -0.1,
          }
        )

        gsap.fromTo(
          '.mobile_menu_social',
          {
            opacity: 1,
            y: 0,
          },
          {
            y: 30,
            opacity: 0,
            duration: 0.35,
            ease: 'power1.inOut',
            delay: 0,
            stagger: -0.1,
          }
        )
      }

      animate()
    },

    reset() {
      Object.values(cleaners).forEach((reset) => reset())
    },
  }
}

export { useAnimations }
