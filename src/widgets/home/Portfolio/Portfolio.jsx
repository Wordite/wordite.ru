import Coffee from '../../../3d/Coffee'
import Work from '../../../entities/Work/Work'
import style from './Portfolio.module.scss'
import { useStore } from '@nanostores/react'
import { $section } from '../../../app/store/section'
import React, { useEffect } from 'react'
import { useAnimations } from '../../../app/hooks/useAnimations'


const Portfolio = () => {
  const section = useStore($section)
  const animations = useAnimations(true)

  useEffect(() => {
    if (section === 2) {
      animations.blockChildren({
        selector: '.' + style.works + ' figure',
        direction: 'x',
        startOffset: 60,
        duration: 0.05,
        delay: 0.6,
        stagger: 0.15,
      })

      animations.class({
        selector: '.' + style.slogan + ' p',
        isForChildren: true,
        stagger: 0.7,
        delay: 550,
        className: 'active',
      })

      animations.class({
        selector: '.' + style.background,
        className: style.active,
      })

      animations.class({
        selector: '.' + style.title,
        delay: 400,
        className: 'active',
      })

      animations.class({
        selector: '.' + style.coffee,
        delay: 750,
        className: style.active,
      })

      return
    }

    animations.reset()
  }, [section])

  return (
    <section className={style.portfolio}>
      <div className='section_content hidden'>
        <h2 className={style.title + ' text'}>PORTFOLIO</h2>

        <div className={style.works}>
          <Work />
          <Work />
          <Work />
          <Work />
        </div>

        <div className={style.slogan}>
          <p className='text_white_80'>
            Logic can take you from point A to point B, and
          </p>
          <p className='text_white_80'>imagination can take you anywhere</p>
        </div>

        <div className={style.background}></div>
        <Coffee className={style.coffee} />
      </div>
    </section>
  )
}

export default React.memo(Portfolio)
