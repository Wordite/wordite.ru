import style from './MenuSection.module.scss'
import Arrow from '../../assets/icons/diagonal_arrow.svg?react'
import { useCloseMenu } from '../../app/hooks/useCloseMenu'
import { $scrollTo } from '../../app/store/scrollTo'
import { useStore } from '@nanostores/react'
import { $isHome } from '../../app/store/isHome'

const MenuSection = ({ title, link = '/', index = 0 }) => {
  const closeMenu = useCloseMenu()
  const isHome = useStore($isHome)

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
    <fragment className={`${style.section} menu_section`} data-index={index}>
      {isHome ? (<>
        <a href={link} className={style.linkWrapper} onClick={handleClick}>
        <div className={`${style.line} menu_section_line`}></div>

        <p className={`${style.title} menu_section_title`}>{title}</p>

        <div className={`${style.arrow} menu_section_arrow`}>
          <Arrow />
          <Arrow />
        </div>
      </a>
      </>) : (<>

      </>)}

    </fragment>
  )
}

export default MenuSection
