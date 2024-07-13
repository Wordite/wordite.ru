import SquareLink from '../../entities/SquareLink/SquareLink'
import style from './Footer.module.scss'

import glass from '../../assets/img/x_glass.png'
import circle from '../../assets/img/bg_dark_circle.png'
import React, { useEffect, useState } from 'react'
import { enterView } from '../../app/js/enterView'
import { useAnimations } from '../../app/hooks/useAnimations'

const Footer = () => {
  const animations = useAnimations()

  useEffect(() => {
    enterView({
      target: '.' + style.title,
      enter: () => {
        animations.class({
          selector:'.' + style.title,
          className: 'active',
          delay: 250
        })
      }
    })

    enterView({
      target: '.' + style.glass,
      enter: () => {
        animations.blockChildren({
          selector: '.' + style.content + ' nav a > div',
          stagger: 0.05,
          direction: 'x',
          startOffset: -40,
          delay: 1,
        })

        animations.block({
          selector: '.' + style.glass,
          delay: 1.5,
          startOffset: 350,
          duration: 0.3,
          ease: 'power1.out'
        })

        animations.class({
          selector:'.' + style.mail,
          className: 'active',
          delay: 600
        })

        animations.class({
          selector:'.' + style.year,
          className: 'active',
          delay: 700
        })

        animations.class({
          selector:'.' + style.head,
          className: 'active',
          delay: 100,
          isForChildren: true,
          stagger: 100
        })
      },
      exit: () => {
        animations.reset()
      }
    })
  }, [])


  return (
    <footer className={style.footer}>
      <h2 className={style.title + ' text'}>FOOTER</h2>

      <div className={style.content}>
        <div className={style.category}>
          <p className={style.head + ' text'}>SECTIONS</p>
          <nav className={style.links}>
            <SquareLink title='First screen' number='01' type='sections' />
            <SquareLink title='Portfolio' number='02' type='sections' />
            <SquareLink title='Services' number='03' type='sections' />
            <SquareLink title='Skills' number='04' type='sections' />
            <SquareLink title='Photos' number='05' type='sections' />
          </nav>
        </div>

        <div className={style.category}>
          <p className={style.head + ' text'}>SOCIALS</p>
          <nav className={style.links}>
            <SquareLink title='Github' number='01' type='socials' icon='github' />
            <SquareLink title='VK' number='02' type='socials' icon='vk' />
            <SquareLink title='Email' number='03' type='socials' icon='mail' />
            <SquareLink title='Telegram' number='04' type='socials' icon='telegram' />
          </nav>
        </div>

        <div className={style.category}>
          <p className={style.head + ' text'}>PAGES</p>
          <nav className={style.links}>
            <SquareLink title='Home' number='01' type='pages' icon='link' />
            <SquareLink title='All works' number='02' type='pages' icon='link' />
          </nav>
        </div>

        <div className={style.info}>
          <img src={glass.src} className={style.image + ' ' + style.glass} alt="X glass" />
          <img src={circle.src} className={style.image + ' ' + style.circle} alt="bg circle" />

          <p className={style.mail}>
            <a href="mailto:wordite123@gmail.com" className='text'>
              wordite123@gmail.com
            </a>
          </p>
        </div>

      </div>

      <div className={style.bottom}>
        <p className={style.year + ' text_white_80'}>2024</p>
      </div>
    </footer>
  )
}

export default React.memo(Footer)
