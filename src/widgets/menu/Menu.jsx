import { useStore } from '@nanostores/react'
import style from './Menu.module.scss'
import { $menu } from '../../app/store/menu'
import { useEffect } from 'react'
import MenuSection from '../../features/MenuSection/MenuSection'
import { useAnimations } from '../../app/hooks/useAnimations'

const Menu = () => {
  const state = useStore($menu)
  const isOpened = state === 'opening' || state === 'opened' || state === 'closing'
  const animations = useAnimations()

  useEffect(() => {
    if (state === 'opening') {
        animations.menuSectionOpen()
        setTimeout(() => $menu.set('opened'), 1400)
    }
}, [state])

  return (
    <div className={`${style.menu} ${isOpened ? style.open : ''} menu`}>
      <MenuSection title='FIRST SCREEN' index={1} />
      <MenuSection title='PORTFOLIO' index={2} />
      <MenuSection title='SERVICES' index={3} />
      <MenuSection title='SKILLS' index={4} />
      <MenuSection title='MY PHOTOS' index={5} />
      <MenuSection title='ALL WORKS' index={6} />

      <p className={`${style.title} menu_head_title`}>MENU</p>
    </div>
  )
}

export default Menu