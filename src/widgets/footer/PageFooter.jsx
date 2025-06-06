import SquareLink from '../../entities/SquareLink/SquareLink'
import style from './Footer.module.scss'

import glass from '../../assets/img/x_glass.png'
import circle from '../../assets/img/bg_dark_circle.png'
import React, { useEffect, useState } from 'react'
import { enterView } from '../../app/js/enterView'
import { useAnimations } from '../../app/hooks/useAnimations'

import { $locale } from '../../app/store/locale'
import { useTranslations } from '../../app/i18n/utils'
import { useStore } from '@nanostores/react'

const PageFooter = () => {
  const animations = useAnimations()
  const locale = useStore($locale)
  const t = useTranslations(locale)

  useEffect(() => {
    enterView({
      target: '.' + style.title,
      enter: () => {
        animations.class({
          selector: '.' + style.title,
          className: 'active',
          delay: 250,
        })
      },
    })

    enterView({
      target: '.' + style.glass,
      enter: () => {
        animations.blockChildren({
          selector: '.' + style.content + ' nav a > div',
          stagger: 0.05,
          direction: 'x',
          startOffset: -40,
          delay: 1,
        })

        animations.block({
          selector: '.' + style.glass,
          delay: 1.5,
          startOffset: 350,
          duration: 0.3,
          ease: 'power1.out',
        })

        animations.class({
          selector: '.' + style.mail,
          className: 'active',
          delay: 1000,
        })

        animations.class({
          selector: '.' + style.year,
          className: 'active',
          delay: 700,
        })

        animations.class({
          selector: '.' + style.head,
          className: 'active',
          delay: 100,
          isForChildren: true,
          stagger: 100,
        })
      },
      exit: () => {
        animations.reset()
      },
    })
  }, [animations, locale])

  return (
    <footer className={style.footer}>
      <h2 className={style.title + ' text'}>{t('footer.title')}</h2>

      <div className={style.content}>
        <div className={style.category}>
          <p className={style.head + ' text'}>{t('footer.socials')}</p>
          <nav className={style.links}>
            <SquareLink title={t('footer.github')} number='01' type='socials' icon='github' link='https://github.com/Wordite' />
            <SquareLink title={t('footer.vk')} number='02' type='socials' icon='vk' link='https://vk.com/l.o_oll' />
            <SquareLink title={t('footer.email')} number='03' type='socials' icon='mail' link='mailto:hello@wordite.ru' />
            <SquareLink title={t('footer.telegram')} number='04' type='socials' icon='telegram' link='https://t.me/dannnyweb' />
          </nav>
        </div>

        <div className={style.category}>
          <p className={style.head + ' text'}>{t('footer.pages')}</p>
          <nav className={style.links}>
            <SquareLink title={t('footer.home')} number='01' type='pages' icon='link' link={`/${locale}`} />
            <SquareLink title={t('footer.allWorks')} number='02' type='pages' icon='link' link={`/${locale}/works`} />
          </nav>
        </div>

        <div className={style.info}>
          <img src={glass.src} className={style.image + ' ' + style.glass} alt={t('footer.glassAlt')} />
          <img src={circle.src} className={style.image + ' ' + style.circle} alt={t('footer.circleAlt')} />

          <p className={`${style.mail} text`}>
            <a href='mailto:hello@wordite.ru'>hello@wordite.ru</a>
          </p>
        </div>
      </div>

      <div className={style.bottom}>
        <p className={style.year + ' text_white_80'}>{new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default React.memo(PageFooter)
