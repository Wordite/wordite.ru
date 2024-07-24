import { useStore } from '@nanostores/react'
import style from './Menu.module.scss'
import { $menu } from '../../app/store/menu'
import React, { useEffect } from 'react'
import MenuSection from '../../features/MenuSection/MenuSection'
import { useAnimations } from '../../app/hooks/useAnimations'
import { $isMobile } from '../../app/store/isMobile'
import { $isHome } from '../../app/store/isHome'

import { $locale } from '../../app/store/locale'
import { useTranslations } from '../../app/i18n/utils'

const Menu = () => {
  const state = useStore($menu)
  const isMobile = useStore($isMobile)
  const isOpened = (state === 'opening' || state === 'opened' || state === 'closing') && !isMobile
  const animations = useAnimations()
  const isHome = useStore($isHome)
  const locale = useStore($locale)
  const t = useTranslations(locale)

  const mouseMove = (e) => {
    const el = e.currentTarget
    const coords = el.getBoundingClientRect()

    const x = e.clientX - coords.left
    const y = e.clientY - coords.top

    el.style.setProperty('--mouse-x', x + 'px')
    el.style.setProperty('--mouse-y', y + 'px')
  }

  useEffect(() => {
    if (isMobile) return

    if (state === 'opening') {
      animations.menuSectionOpen()
      setTimeout(() => $menu.set('opened'), 1400)
    }
  }, [state])

  return (
    <div className={`${style.menu} ${isOpened ? style.open : ''} menu`}>
      <MenuSection title={t('menu.firstScreen')} index={1} link='#hero' />
      <MenuSection title={t('menu.portfolio')} index={2} link='#portfolio' />
      <MenuSection title={t('menu.services')} index={3} link='#services' />
      <MenuSection title={t('menu.skills')} index={4} link='#skills' />
      <MenuSection title={t('menu.photos')} index={5} link='#photos' />
      <MenuSection title={t('menu.allWorks')} index={6} link={`/${locale}/works`} />

      <p className={`${style.title} menu_head_title`}>{t('menu.title')}</p>

      {!isHome && (
        <a className={`${style.home} menu_home`} onMouseMove={mouseMove} href={`/${locale}`}>
          <span>{t('menu.home')}</span>
        </a>
      )}
    </div>
  )
}

export default React.memo(Menu)
