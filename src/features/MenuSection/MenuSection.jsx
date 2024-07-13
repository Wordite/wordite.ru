import style from './MenuSection.module.scss'
import Arrow from '../../assets/icons/diagonal_arrow.svg?react'

const MenuSection = ({ title, link = '/', index = 0 }) => {
  return (
    <fragment className={`${style.section} menu_section`} data-index={index}>
      <a href={link} className={style.linkWrapper}>
        <div className={`${style.line} menu_section_line`}></div>

        <p className={`${style.title} menu_section_title`}>{title}</p>

        <div className={`${style.arrow} menu_section_arrow`}>
          <Arrow />
          <Arrow />
        </div>
      </a>
    </fragment>
  )
}

export default MenuSection
