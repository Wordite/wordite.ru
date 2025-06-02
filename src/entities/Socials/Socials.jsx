import style from './Socials.module.scss'

import Github from '../../assets/icons/github.svg?react'
import VK from '../../assets/icons//vk.svg?react'
import Gmail from '../../assets/icons//gmail.svg?react'
import Telegram from '../../assets/icons//telegram.svg?react'
import { useStore } from '@nanostores/react'
import { $down } from '../../app/store/down'
import { $earth } from '../../app/store/earth'
import { useAnimations } from '../../app/hooks/useAnimations'
import { useEffect } from 'react'
import { $loader } from '../../app/store/loader'

import { $locale } from '../../app/store/locale'
import { useTranslations } from '../../app/i18n/utils'


const Socials = () => {
  const isDown = useStore($down)
  const earth = useStore($earth)
  const animations = useAnimations()
  const loader = useStore($loader)
  const locale = useStore($locale)
  const t = useTranslations(locale)

  useEffect(() => {
    const isHome = document.body.querySelector('#home')

    if (earth !== 'ready' && isHome) return
    if (!isHome && loader !== 'closed') return

    animations.blockChildren({
      selector: `.${style.socials} > div`,
      stagger: -0.05,
      duration: 0.3,
      delay: 0.75,
    })
  }, [earth, loader])

  return (
    <div className={style.socials + ' ' + (isDown ? style.down : '')}>
      <div className={style.iconContainer}>
        <a href='https://github.com/Wordite' target='_blank'>
          <Github className={style.icon + ' ' + style.github} />
        </a>
      </div>
      <div className={style.iconContainer}>
        <a href='https://vk.com/l.o_oll' target='_blank'>
          <VK className={style.icon + ' ' + style.vk} />
        </a>
      </div>
      <div className={style.iconContainer}>
        <a href='mailto:wordite123@gmail.com' target='_blank'>
          <Gmail className={style.icon + ' ' + style.gmail} />
        </a>
      </div>
      <div className={style.iconContainer}>
        <a href='https://t.me/word1te' target='_blank'>
          <Telegram className={style.icon + ' ' + style.telegram} />
        </a>
      </div>

      <p className={`${style.text}`}>{t('socials.moneyForMe')}</p>
    </div>
  )
}

export default Socials
