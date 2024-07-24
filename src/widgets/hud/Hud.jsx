import { useStore } from '@nanostores/react'
import Socials from '../../entities/Socials/Socials'
import Burger from '../../features/Burger/Burger'
import style from './Hud.module.scss'
import { $section } from '../../app/store/section'
import { $down } from '../../app/store/down'
import React, { useEffect } from 'react'
import { $earth } from '../../app/store/earth'
import { useAnimations } from '../../app/hooks/useAnimations'
import { $loader } from '../../app/store/loader'

import { $locale } from '../../app/store/locale'
import { useTranslations } from '../../app/i18n/utils'

const Hud = () => {
  const section = useStore($section)
  const isDown = useStore($down)
  const earth = useStore($earth)
  const loader = useStore($loader)
  const locale = useStore($locale)
  const t = useTranslations(locale)
  const animations = useAnimations()

  useEffect(() => {
    setInterval(() => {
      const container = document.body.querySelector('#home') ? document.body.querySelector('.scrollable_container') : document.body.querySelector('.wordite_page_container')
      const isPageDown = container.scrollHeight - 20 < container.scrollTop + window.innerHeight && container.scrollTop !== 0
      const down = $down.get()

      if (isPageDown && !down) $down.set(true)
      else if (!isPageDown && down) $down.set(false)
    }, 200)
  }, [])

  useEffect(() => {
    const isHome = document.body.querySelector('#home')

    if (earth !== 'ready' && isHome) return
    if (!isHome && loader !== 'closed') return

    animations.block({
      selector: `.${style.name} a`,
      startOffset: '110%',
      duration: 0.25,
      direction: 'y',
      delay: 0.65,
    })

    animations.blockChildren({
      selector: `.${style.languageLink}`,
      startOffset: '110%',
      duration: 0.25,
      delay: 0.8,
      stagger: 0.05,
    })

    animations.block({
      selector: `.${style.slogan}`,
      startOffset: '110%',
      duration: 0.25,
      delay: 0.4,
    })
  }, [earth, loader])

  return (
    <header className={style.hud}>
      <div className={style.name}>
        <a href={`/${locale}`}>{t('hud.wordite')}</a>
      </div>

      <Socials />

      <div className={`${style.accent} ${isDown ? style.down : ''}`}>
        <span className={`${style.slogan} ${section !== 1 && !isDown ? style.hidden : ''}`}>{t('hud.slogan')}</span>
        <a className={`${style.works} ${section !== 1 && !isDown ? style.active : ''} text_hover_white`} href='/works'>
          {t('hud.viewAllWorks')}
        </a>
      </div>

      <Burger />

      <div className={style.menu}>
        <div className={style.languageLinks}>
          <a href='/en' className={`${style.languageLink} text_hover_white`}>
            {t('hud.en')}
          </a>
          <a href='/ru' className={`${style.languageLink} text_hover_white`}>
            {t('hud.ru')}
          </a>
        </div>
      </div>
    </header>
  )
}

export default React.memo(Hud)
