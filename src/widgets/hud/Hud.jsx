import { useStore } from '@nanostores/react'
import Socials from '../../entities/Socials/Socials'
import Burger from '../../features/Burger/Burger'
import style from './Hud.module.scss'
import { $section } from '../../app/store/section'
import { $down } from '../../app/store/down'
import React, { useEffect } from 'react'
import { $earth } from '../../app/store/earth'
import { useAnimations } from '../../app/hooks/useAnimations'

const Hud = () => {
  const section = useStore($section)
  const isDown = useStore($down)
  const earth = useStore($earth)
  const animations = useAnimations()

  useEffect(() => {
    setInterval(() => {
      const container = document.body.querySelector('.scrollable_container')
      const isPageDown = container.scrollHeight - 20 < container.scrollTop + window.innerHeight && container.scrollTop !== 0
      const down = $down.get()

      if (isPageDown && !down) $down.set(true)
      else if (!isPageDown && down) $down.set(false)
    }, 200)
  }, [])

  useEffect(() => {
    if (earth !== 'ready') return

    animations.block({
      selector: `.${style.name} a`,
      startOffset: '110%',
      duration: .25,
      direction: 'y',
      delay: .65
    })

    animations.blockChildren({
      selector: `.${style.languageLink}`,
      startOffset: '110%',
      duration: .25,
      delay: .8,
      stagger: .05
    })

    animations.block({
      selector: `.${style.slogan}`,
      startOffset: '110%',
      duration: .25,
      delay: .4
    })
  }, [earth])


  return (
    <header className={style.hud}>
        <div className={style.name}>
          <a href="/en">WORDITE</a>
        </div>

        <Socials />

        <div className={`${style.accent} ${isDown ? style.down : ''}`}>
          <span className={`${style.slogan} ${(section !== 1 && !isDown) ? style.hidden : ''}`}>PROFESSIONAL WEB DEVELOPER</span>
          <a className={`${style.works} ${(section !== 1 && !isDown) ? style.active : ''} text_hover_white`} href="/works">VIEW ALL WORKS</a>
        </div>

        <Burger />

        <div className={style.menu}>
          <div className={style.languageLinks}>
            <a href='/en' className={`${style.languageLink} text_hover_white`}>EN</a>
            <a href='/ru' className={`${style.languageLink} text_hover_white`}>RU</a>
          </div>
        </div>
    </header>
  )
}

export default React.memo(Hud)