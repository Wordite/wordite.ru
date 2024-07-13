import style from './Service.module.scss'
import puma from '../../assets/puma.png'
import { useRef } from 'react'

const Service = ({ title, text }) => {
  const background = useRef(null)
  const service = useRef(null)

  const onMouseEnter = ({ title, text }) => {
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
          <p className={style.description}>DESCRIPTION</p>
          <p className={style.text}>{text}</p>
        </div>

        <img className={style.preview} src={puma.src} alt="work" />
    </figure>
  )
}

export default Service