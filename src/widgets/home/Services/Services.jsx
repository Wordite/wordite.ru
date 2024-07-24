import { useStore } from '@nanostores/react'
import cofffee from '../../../assets/img/coffee_img.png'
import Service from '../../../entities/Service/Service'
import style from './Services.module.scss'
import { $section } from '../../../app/store/section'
import { useAnimations } from '../../../app/hooks/useAnimations'
import React, { useEffect } from 'react'
import { $locale } from '../../../app/store/locale'
import { useTranslations } from '../../../app/i18n/utils'

const Services = () => {
  const section = useStore($section)
  const animations = useAnimations(true)
  const locale = useStore($locale)
  const t = useTranslations(locale)

  useEffect(() => {
    if (section !== 3) return animations.reset()

    animations.block({
      selector: '.' + style.coffee,
      direction: 'y',
      endOffset: '100%',
      duration: 0.45,
      opacity: 1,
      ease: 'power1.out',
    })

    animations.blockChildren({
      selector: '.' + style.list + ' figure',
      direction: 'x',
      endOffset: 0,
      duration: 0.45,
      stagger: 0.15,
    })

    animations.class({
      selector: '.' + style.title,
      className: 'active',
    })

    animations.class({
      selector: '.' + style.services,
      className: style.active,
    })
  }, [section])

  return (
    <section className={style.services} id='services'>
      {/* <img className={style.coffee} src={cofffee.src} alt='coffee' /> */}
      <h2 className={style.title + ' text_dark'}>{t('services.title')}</h2>

      <div className={style.list}>
        <Service title={t('services.landing.title')} text={t('services.landing.text')} />
        <Service title={t('services.multipage.title')} text={t('services.multipage.text')} />
        <Service title={t('services.shop.title')} text={t('services.shop.text')} />
        <Service title={t('services.webapp.title')} text={t('services.webapp.text')} />
      </div>
    </section>
  )
}

export default React.memo(Services)
