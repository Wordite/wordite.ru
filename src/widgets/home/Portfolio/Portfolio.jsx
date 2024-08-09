import Coffee from '../../../3d/Coffee'
import Work from '../../../entities/Work/Work'
import style from './Portfolio.module.scss'
import { useStore } from '@nanostores/react'
import { $section } from '../../../app/store/section'
import React, { useEffect } from 'react'
import { useAnimations } from '../../../app/hooks/useAnimations'

import college from '../../../assets/case_cards/college.png'
import puma from '../../../assets/case_cards/puma.png'
import twopizza from '../../../assets/case_cards/twopizza.png'
import findproducts from '../../../assets/case_cards/findproducts.png'

import { $locale } from '../../../app/store/locale'
import { useTranslations } from '../../../app/i18n/utils'

const Portfolio = () => {
  const section = useStore($section)
  const animations = useAnimations(true)
  const locale = useStore($locale)
  const t = useTranslations(locale)

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
        <h2 className={style.title + ' text'}>{t('portfolio.title')}</h2>

        <div className={style.works}>
          <Work path={college.src} link={`/${locale}/cases/college`} description={t('work.multipage')} />
          <Work path={puma.src} link={`/${locale}/cases/puma`} description={t('work.landingPage')} />
          <Work path={findproducts.src} link={`/${locale}/cases/findproducts`} description={t('work.landingPage')} />
          <Work path={twopizza.src} link={`/${locale}/cases/twopizza`} description={t('work.shop')} />
        </div>

        <div className={style.slogan}>
          <p className='text_white_80'>{t('portfolio.slogan.part1')}</p>
          <p className='text_white_80'>{t('portfolio.slogan.part2')}</p>
        </div>

        <div className={style.background}></div>
        <Coffee className={style.coffee} />
      </div>
      <p id='home' className='hidden'></p>
    </section>
  )
}

export default React.memo(Portfolio)
