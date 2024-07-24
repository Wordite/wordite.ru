import style from './SquareLink.module.scss'
import DivMouseBlock from '../../shared/MouseBackgrounds/DivMouseBlock/DivMouseBlock'

import Github from '../../assets/icons/github.svg?react'
import VK from '../../assets/icons/vk.svg?react'
import Gmail from '../../assets/icons/gmail.svg?react'
import Telegram from '../../assets/icons/telegram.svg?react'
import DiagonalArrow from '../../assets/icons/diagonal_arrow.svg?react'
import { $scrollTo } from '../../app/store/scrollTo'
import { useCloseMenu } from '../../app/hooks/useCloseMenu'


const iconBlock = (icon) => {
  if (icon === 'github') return <Github className={style.icon + ' ' + style.github} />
  else if (icon === 'vk') return <VK className={style.icon + ' ' + style.vk} />
  else if (icon === 'mail') return <Gmail className={style.icon + ' ' + style.gmail} />
  else if (icon === 'telegram') return <Telegram className={style.icon + ' ' + style.telegram} />
  else if (icon === 'link') return <DiagonalArrow className={style.icon + ' ' + style.arrow} />
}

const SquareLink = ({ title, number, type, link = '/', icon = '' }) => {
  const closeMenu = useCloseMenu()

  const handleClick = (e) => {
    if (!link.startsWith('#')) return closeMenu()

    e.preventDefault()
    closeMenu()

    if (link === '#services') return $scrollTo.setKey('target', 'services')
    if (link === '#portfolio') return $scrollTo.setKey('target', 'portfolio')
    if (link === '#skills') return $scrollTo.setKey('target', 'skills')
    if (link === '#photos') return $scrollTo.setKey('target', 'photos')
    if (link === '#hero') return $scrollTo.setKey('target', 'hero')
  }

  return (
    <a href={link} onClick={handleClick} target={`${type === 'socials' ? '_blank' : ''}`}>
        <DivMouseBlock className={style.link}>
            <p className={style.number}>{number}</p>
            <p className={style.to}>{title}</p>

            {type !== 'sections' ? iconBlock(icon) : ''}
        </DivMouseBlock>
    </a>
  )
}

export default SquareLink