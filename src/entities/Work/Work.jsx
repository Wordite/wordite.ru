import style from './Work.module.scss'
import work from '../../assets/work.png'

import Arrow from '../../assets/icons/diagonal_arrow.svg?react'

const Work = () => {
  return (
    <a href="/">
        <figure className={style.work}>
            <img src={work.src} alt='img' className={style.preview} />

            <div className={style.popup}>
                <p className={style.popupTitle}>VIEW PROJECT</p>
                <p className={style.popupSubtitle}>Landing page</p>

                <Arrow className={style.arrow} />
            </div>
        </figure>
    </a>
  )
}

export default Work
