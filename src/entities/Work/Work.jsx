import style from './Work.module.scss'
import Arrow from '../../assets/icons/diagonal_arrow.svg?react'
import { $locale } from '../../app/store/locale'
import { useTranslations } from '../../app/i18n/utils'
import { useStore } from '@nanostores/react'

const Work = ({ path, link, description }) => {
  const locale = useStore($locale)
  const t = useTranslations(locale)

  return (
    <a href={link}>
      <figure className={style.work}>
        <img src={path} alt={t('work.image.alt')} className={style.preview} />

        <div className={style.popup}>
          <p className={style.popupTitle}>{t('work.viewProject')}</p>
          <p className={style.popupSubtitle}>{description}</p>

          <Arrow className={style.arrow} />
        </div>
      </figure>
    </a>
  )
}

export default Work
