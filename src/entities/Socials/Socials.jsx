import style from './Socials.module.scss'

import Github from '../../app/assets/images/icons/github.svg?react'
import VK from '../../app/assets/images/icons/vk.svg?react'
import Gmail from '../../app/assets/images/icons/gmail.svg?react'
import Telegram from '../../app/assets/images/icons/telegram.svg?react'
import { useStore } from '@nanostores/react'
import { $down } from '../../app/store/down'
import { $earth } from '../../app/store/earth'
import { useAnimations } from '../../app/hooks/useAnimations'
import { useEffect } from 'react'

const Socials = () => {
  const isDown = useStore($down)
  const earth = useStore($earth)
  const animations = useAnimations()

  useEffect(() => {
    if (earth !== 'ready') return

    animations.blockChildren({
      selector: `.${style.socials} > div`,
      stagger: -.05,
      duration: .3,
      delay: .75
    })
  }, [earth])

  return (
    <div className={style.socials + ' ' + (isDown ? style.down : '')}>
        <div><Github className={style.icon + ' ' + style.github} /></div>
        <div><VK className={style.icon + ' ' + style.vk} /></div>
        <div><Gmail className={style.icon + ' ' + style.gmail} /></div>
        <div><Telegram className={style.icon + ' ' + style.telegram} /></div>

        <p className={`${style.text}`}>ARE YOU HAVE MONEY FOR ME?</p>
    </div>
  )
}

export default Socials