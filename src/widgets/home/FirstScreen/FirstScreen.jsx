import { useStore } from '@nanostores/react'
import Earth from '../../../3d/Earth'
import LinkMouseBlock from '../../../shared/MouseBackgrounds/LinkMouseBlock/LinkMouseBlock'
import style from './FirstScreen.module.scss'
import { $earth } from '../../../app/store/earth'
import { useAnimations } from '../../../app/hooks/useAnimations'
import React, { useEffect } from 'react'
import { $section } from '../../../app/store/section'

const FirstScreen = () => {
  const earth = useStore($earth)
  const animations = useAnimations(true)
  const section = useStore($section)

  useEffect(() => {
    if (earth !== 'ready') return
    if (section !== 1) return animations.reset()

    animations.class({
      selector: '.' + style.title + ' span',
      className: 'active',
      isForChildren: true,
      stagger: 50
    })

    animations.block({
      selector: '.' + style.contact,
      delay: .5,
      startOffset: 40,
      direction: 'y',
      duration: 0.3,
      ease: 'power1.out'
    })

  }, [earth, section])

  return (
    <section className={style.firstScreen}>
      <div className='section_content'>
        <Earth className={style.earth} />

        <div className={style.text}>
          <h1 className={style.title}>
              <span className='text'>WEB</span><span className='text'> DEVELOPER </span>
              <span className='text'>SINCE</span><span className='text'> 2020</span>
          </h1>

          <LinkMouseBlock href='/' className={style.contact}>CONTACT ME</LinkMouseBlock>
        </div>
      </div>
    </section>
  )
}

export default React.memo(FirstScreen)
