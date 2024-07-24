import style from './Service.module.scss'
import { useRef } from 'react'
import { $locale } from '../../app/store/locale'
import { useTranslations } from '../../app/i18n/utils'
import { useStore } from '@nanostores/react'


const Service = ({ title, text, path }) => {
  const background = useRef(null)
  const service = useRef(null)
  const locale = useStore($locale)
  const t = useTranslations(locale)

  const onMouseEnter = () => {
    background.current.classList.add(style.active)
    service.current.classList.add(style.active)
  }

  const onMouseLeave = () => {
    background.current.classList.remove(style.active)
    service.current.classList.remove(style.active)
  }

  return (
    <figure ref={service} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={style.service}>
      <div ref={background} className={style.background}></div>

      <h4 className={style.name}>{title}</h4>

      <div className={style.textContainer}>
        <p className={style.description}>{t('service.description')}</p>
        <p className={style.text}>{text}</p>
      </div>

      <img className={style.preview} src={path} alt={t('service.image.alt')} />
    </figure>
  )
}

export default Service
