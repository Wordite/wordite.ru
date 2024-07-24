import { useStore } from '@nanostores/react'
import style from './MobileMenu.module.scss'
import { $menu } from '../../app/store/menu'
import React, { useEffect } from 'react'
import { useAnimations } from '../../app/hooks/useAnimations'
import { $isMobile } from '../../app/store/isMobile'
import Github from '../../assets/icons/github.svg?react'
import VK from '../../assets/icons//vk.svg?react'
import Gmail from '../../assets/icons//gmail.svg?react'
import Telegram from '../../assets/icons//telegram.svg?react'
import { useCloseMenu } from '../../app/hooks/useCloseMenu'
import { $scrollTo } from '../../app/store/scrollTo'
import { $isHome } from '../../app/store/isHome'

import { $locale } from '../../app/store/locale'
import { useTranslations } from '../../app/i18n/utils'

const MobileMenu = () => {
  const state = useStore($menu)
  const isMobile = useStore($isMobile)
  const isOpened = (state === 'opening' || state === 'opened' || state === 'closing') && isMobile
  const animations = useAnimations()
  const closeMenu = useCloseMenu()
  const isHome = useStore($isHome)
  const locale = useStore($locale)
  const t = useTranslations(locale)

  const handleClick = (e) => {
    const target = e.currentTarget
    const link = target.href.substring(target.href.indexOf('#'))

    if (target.href.indexOf('#') === -1) return closeMenu()

    e.preventDefault()
    closeMenu()

    if (link === '#services') return $scrollTo.setKey('target', 'services')
    if (link === '#portfolio') return $scrollTo.setKey('target', 'portfolio')
    if (link === '#skills') return $scrollTo.setKey('target', 'skills')
    if (link === '#photos') return $scrollTo.setKey('target', 'photos')
    if (link === '#hero') return $scrollTo.setKey('target', 'hero')
  }

  useEffect(() => {
    if (!isMobile) return

    if (state === 'opening') {
      animations.mobileMenuSectionOpen()
      setTimeout(() => $menu.set('opened'), 1400)
    }
  }, [state])

  return (
    <div className={`${style.menu} ${isOpened ? style.open : ''} mobile_menu`}>
      <div className={`${style.backgroundElement} mobile_menu_background`}></div>
      <div className={`${style.backgroundElement} mobile_menu_background`}></div>
      <div className={`${style.backgroundElement} mobile_menu_background`}></div>
      <div className={`${style.backgroundElement} mobile_menu_background`}></div>
      <div className={`${style.backgroundElement} mobile_menu_background`}></div>
      <div className={`${style.backgroundElement} mobile_menu_background`}></div>

      <h3 className={`${style.title} mobile_menu_title`}>{t('menu.title')}</h3>

      <div className={`${style.languageLinks} mobile_menu_languageLinks`}>
        <a href='/en' className={`${style.languageLink}`}>
          EN
        </a>
        <a href='/ru' className={`${style.languageLink}`}>
          RU
        </a>
      </div>

      <nav className={`${style.links} mobile_menu_links`}>
        <ul>
          {!isHome ? (
            <li className={style.link}>
              <a href={`/${locale}`} onClick={handleClick}>
                {t('menu.home')}
              </a>
            </li>
          ) : (
            <>
              <li className={style.link}>
                <a href='#hero' onClick={handleClick}>
                  {t('menu.firstScreen')}
                </a>
              </li>
              <li className={style.link}>
                <a href='#services' onClick={handleClick}>
                  {t('menu.services')}
                </a>
              </li>
              <li className={style.link}>
                <a href='#skills' onClick={handleClick}>
                  {t('menu.skills')}
                </a>
              </li>
              <li className={style.link}>
                <a href='#photos' onClick={handleClick}>
                  {t('menu.photos')}
                </a>
              </li>
            </>
          )}
          <li className={style.link}>
            <a href={`/${locale}/works`} onClick={handleClick}>
              {t('menu.portfolio')}
            </a>
          </li>
        </ul>
      </nav>

      <div className={style.socials}>
        <div className={style.iconContainer}>
          <a href='https://github.com/Wordite' target='_blank' rel='noopener noreferrer'>
            <Github className={style.icon + ' ' + style.github + ' ' + 'mobile_menu_social'} />
          </a>
        </div>
        <div className={style.iconContainer}>
          <a href='https://vk.com/l.o_oll' target='_blank' rel='noopener noreferrer'>
            <VK className={style.icon + ' ' + style.vk + ' ' + 'mobile_menu_social'} />
          </a>
        </div>
        <div className={style.iconContainer}>
          <a href='mailto:wordite123@gmail.com' target='_blank' rel='noopener noreferrer'>
            <Gmail className={style.icon + ' ' + style.gmail + ' ' + 'mobile_menu_social'} />
          </a>
        </div>
        <div className={style.iconContainer}>
          <a href='https://t.me/mr_alberg' target='_blank' rel='noopener noreferrer'>
            <Telegram className={style.icon + ' ' + style.telegram + ' ' + 'mobile_menu_social'} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default React.memo(MobileMenu)
