import { useStore } from '@nanostores/react'
import Earth from '../../../3d/Earth'
import LinkMouseBlock from '../../../shared/MouseBackgrounds/LinkMouseBlock/LinkMouseBlock'
import style from './FirstScreen.module.scss'
import { $earth } from '../../../app/store/earth'
import { useAnimations } from '../../../app/hooks/useAnimations'
import React, { useEffect } from 'react'
import { $section } from '../../../app/store/section'
import { $locale } from '../../../app/store/locale'
import { useTranslations } from '../../../app/i18n/utils'

const FirstScreen = () => {
  const earth = useStore($earth)
  const animations = useAnimations(true)
  const section = useStore($section)
  const locale = useStore($locale)
  const t = useTranslations(locale)

  useEffect(() => {
    if (earth !== 'ready') return
    if (section !== 1) return animations.reset()

    animations.class({
      selector: '.' + style.title + ' span',
      className: 'active',
      isForChildren: true,
      stagger: 50,
    })

    animations.block({
      selector: '.' + style.contact,
      delay: 0.5,
      startOffset: 40,
      direction: 'y',
      duration: 0.3,
      ease: 'power1.out',
    })
  }, [earth, section])

  return (
    <section className={style.firstScreen}>
      <div className='section_content'>
        <Earth className={style.earth} />

        <div className={style.text}>
          <h1 className={`${style.title} ${locale === 'ru' ? style.ru : ''}`}>
            <span className='text'>{t('first.screen.title.web')}</span>
            <span className='text'>{locale === 'en' ? t('first.screen.title.developer') : t('first.screen.title.developer') + ' ' + t('first.screen.title.since')}</span>
            {locale === 'en' && (<span className='text'>{t('first.screen.title.since')}</span>)}
            <span className='text'>{t('first.screen.title.year')}</span>
          </h1>

          <LinkMouseBlock href={`/${locale}/works`} className={style.contact}>
            {t('first.screen.link.portfolio')}
          </LinkMouseBlock>
        </div>
      </div>
    </section>
  )
}

export default React.memo(FirstScreen)
