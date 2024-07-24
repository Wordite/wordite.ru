import style from './Skills.module.scss'
import React, { useEffect, useRef } from 'react'
import { useStore } from '@nanostores/react'
import { $section } from '../../../app/store/section'

import HTML from '../../../assets/img/icons/html.png'
import CSS from '../../../assets/img/icons/css.png'
import JS from '../../../assets/img/icons/js.png'
import TS from '../../../assets/img/icons/ts.png'
import Sass from '../../../assets/img/icons/sass.png'
import Tailwind from '../../../assets/img/icons/tailwind.png'
import Webpack from '../../../assets/img/icons/webpack.png'
import ReactImg from '../../../assets/img/icons/react.png'
import NextJS from '../../../assets/img/icons/next.png'
import Astro from '../../../assets/img/icons/astro.png'

import NodeJS from '../../../assets/img/icons/node.png'
import Express from '../../../assets/img/icons/exrpess.png'
import MySQL from '../../../assets/img/icons/mysql.png'

import { $locale } from '../../../app/store/locale'
import { useTranslations } from '../../../app/i18n/utils'

// import HTML from '../../../assets/icons/skills/html.svg'
// import CSS from '../../../assets/icons/skills/css.svg'
// import JS from '../../../assets/icons/skills/js.svg'
// import TS from '../../../assets/icons/skills/ts.svg'
// import Sass from '../../../assets/icons/skills/sass.svg'
// import Tailwind from '../../../assets/icons/skills/tailwind.svg'
// import Webpack from '../../../assets/icons/skills/webpack.svg'
// import React from '../../../assets/icons/skills/react.svg'
// import NextJS from '../../../assets/icons/skills/next.svg'
// import Astro from '../../../assets/icons/skills/astro.svg'

// import NodeJS from '../../../assets/icons/skills/node.svg'
// import Express from '../../../assets/icons/skills/express.svg'
// import MySQL from '../../../assets/icons/skills/mysql.svg'

import { enterView } from '../../../app/js/enterView'
import { useAnimations } from '../../../app/hooks/useAnimations'
import { $isMobile } from '../../../app/store/isMobile'

const skillsData = [
  { text: 'HTML', path: HTML.src, sizes: { w: 68, h: 76 }, x: 0.1, y: -0.1, mobileX: 0.5, mobileY: -0.1 },
  { text: 'CSS', path: CSS.src, sizes: { w: 68, h: 76 }, x: 0.3, y: 0.1, mobileX: 0.1, mobileY: -0.2 },
  { text: 'JS', path: JS.src, sizes: { w: 76, h: 76 }, x: 0.5, y: 0.2, mobileX: 0.9, mobileY: -0.2 },
  { text: 'TS', path: TS.src, sizes: { w: 76, h: 76 }, x: 0.7, y: -0.1, mobileX: 0.5, mobileY: -0.4 },
  { text: 'Sass', path: Sass.src, sizes: { w: 96, h: 72 }, x: 0.9, y: 0.0, mobileX: 0.1, mobileY: -0.6 },
  { text: 'Tailwind', path: Tailwind.src, sizes: { w: 104, h: 60 }, x: 0.1, y: 0.4, mobileX: 0.3, mobileY: -0.7 },
  { text: 'Webpack', path: Webpack.src, sizes: { w: 72, h: 80 }, x: 0.3, y: 0.5, mobileX: 0.7, mobileY: -0.8 },
  { text: 'React', path: ReactImg.src, sizes: { w: 88, h: 88 }, x: 0.5, y: 0.4, mobileX: 0.9, mobileY: -0.7 },
  { text: 'NextJS', path: NextJS.src, sizes: { w: 112, h: 104 }, x: 0.7, y: 0.5, mobileX: 0.5, mobileY: -0.9 },
  { text: 'Astro', path: Astro.src, sizes: { w: 60, h: 76 }, x: 0.9, y: 0.4, mobileX: 0.9, mobileY: -1.0 },
  { text: 'NodeJS', path: NodeJS.src, sizes: { w: 68, h: 80 }, x: 0.1, y: 0.7, mobileX: 0.1, mobileY: -1.1 },
  { text: 'Express', path: Express.src, sizes: { w: 84, h: 112 }, x: 0.3, y: 0.8, mobileX: 0.5, mobileY: -1.2 },
  { text: 'MySQL', path: MySQL.src, sizes: { w: 128, h: 88 }, x: 0.5, y: 0.9, mobileX: 0.9, mobileY: -1.3 },
]

let isNeedRender = false
let section
let isVisible = false
let isMobile = false


const Skills = () => {
  const canvasRef = useRef(null)
  const section = useStore($section)
  const animations = useAnimations()
  const isMobile = useStore($isMobile)
  const locale = useStore($locale)
  const t = useTranslations(locale)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })

    const skillsObjects = []
    const squareSpeed = 0.3

    function resizeCanvas() {
      if (window.innerWidth <= 768) {
        canvas.width = window.innerWidth * 1.6
        canvas.height = window.innerHeight * 1.6
        return
      }
      canvas.width = 1920
      canvas.height = 912
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    function initSkills() {
      for (let skillData of skillsData) {
        const img = new Image()
        img.src = skillData.path

        skillsObjects.push({
          image: img,
          width: skillData.sizes.w,
          height: skillData.sizes.h,
          x: skillData.x * canvas.width,
          y: skillData.y * canvas.height,
          mobileX: skillData.mobileX * canvas.width,
          mobileY: skillData.mobileY * canvas.height,
          baseX: skillData.x,
          baseY: skillData.y,
        })
      }
    }

    initSkills()

    function drawSquares() {
      for (let skill of skillsObjects) {
        drawTransformedSquare(skill)
        skill.y += squareSpeed
        skill.mobileY += squareSpeed * 1.5
      }

      for (let skill of skillsObjects) {
        if (!isMobile && skill.y >= canvas.height + (112 - skill.height)) {
          skill.y = -skill.height
        }
        if (isMobile && skill.y >= canvas.height + (112 - skill.height)) {
          skill.mobileY = -skill.height
          skill.y = -skill.height
        }
      }
    }

    function drawTransformedSquare(skill) {
      ctx.save()
      const x = isMobile ? skill.x : skill.x
      const y = isMobile ? skill.y : skill.y
      ctx.drawImage(skill.image, (0.5 + x) | 0, (0.5 + y) | 0)
      ctx.restore()
    }

    function drawGradient() {
      const gradientHeight = 150
      const topGradient = ctx.createLinearGradient(0, 0, 0, gradientHeight)
      topGradient.addColorStop(0, '#111111ff')
      topGradient.addColorStop(1, '#11111100')
      ctx.fillStyle = topGradient
      ctx.fillRect(0, 0, canvas.width, gradientHeight)

      const bottomGradient = ctx.createLinearGradient(0, canvas.height - gradientHeight, 0, canvas.height)
      bottomGradient.addColorStop(0, '#11111100')
      bottomGradient.addColorStop(1, '#111111ff')
      ctx.fillStyle = bottomGradient
      ctx.fillRect(0, canvas.height - gradientHeight, canvas.width, gradientHeight)
    }

    function render() {
      ctx.fillStyle = '#111111'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      drawSquares()
      drawGradient()
    }

    function prerender() {
      render()
    }

    function draw() {
      requestAnimationFrame(draw)
      if (!isNeedRender) return
      render()
    }

    draw()
    prerender()

    window.addEventListener('resize', () => {
      for (let skill of skillsObjects) {
        skill.x = skill.baseX * canvas.width
        skill.y = skill.baseY * canvas.height
      }
    })

    setInterval(() => {
      if (section !== 3) return
      const { top, bottom } = canvas.getBoundingClientRect()
      const { innerHeight } = window
      isVisible = (top > 0 && top + -100 < innerHeight) || (bottom > 0 && bottom < innerHeight)
      isNeedRender = section === 3 && isVisible
    }, 200)
  }, [section, isMobile])

  useEffect(() => {
    enterView({
      target: '.' + style.title,
      enter: () => {
        animations.class({
          selector: '.' + style.title,
          className: 'active',
        })
      },
      exit: () => {
        animations.reset()
      },
    })
  }, [animations])

  return (
    <section className={style.skills} id='skills'>
      <h2 className={style.title + ' text_dark'}>{t('skills.title')}</h2>
      <canvas ref={canvasRef} className={style.canvas}></canvas>
    </section>
  )
}

export default React.memo(Skills)
