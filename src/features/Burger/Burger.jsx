import React, { useEffect, useState } from 'react'
import style from './Burger.module.scss'
import { $menu } from '../../app/store/menu'
import { useStore } from '@nanostores/react'
import { useAnimations } from '../../app/hooks/useAnimations'
import { $earth } from '../../app/store/earth'
import { $isMobile } from '../../app/store/isMobile'
import { $scrollTo } from '../../app/store/scrollTo'
import { $loader } from '../../app/store/loader'

const completedStates = ['closed', 'opened']

const Burger = () => {
  const [isChecked, setIsChecked] = useState(false)
  const menu = useStore($menu)
  const animations = useAnimations()
  const earth = useStore($earth)
  const isMobile = useStore($isMobile)
  const scrollTo = useStore($scrollTo)
  const loader = useStore($loader)

  if (menu === 'closing' && isChecked) setIsChecked(false)

  const handleClick = (e) => {
    if (!completedStates.includes(menu)) return e.preventDefault()
    if (scrollTo.isScrolling) return

    if (menu === 'opened') {
      $menu.set('closing')

      if (isMobile) animations.mobileMenuSectionClose(() => $menu.set('closed'))
      else animations.menuSectionClose(() => $menu.set('closed'))

      return
    }

    $menu.set('opening')
    setIsChecked(true)
  }

  useEffect(() => {
    const isHome = document.body.querySelector('#home')

    if (earth !== 'ready' && isHome) return
    if (!isHome && loader !== 'closed') return

    animations.block({
      selector: `.${style.burger} figure`,
      duration: .35,
      startOffset: '110%',
      delay: .65,
    })
  }, [earth, loader])

  return (
    <div className={style.burger}>
      <figure>
        <input type='checkbox' checked={isChecked} onClick={handleClick} />
        <span></span>
        <span></span>
        <span></span>
      </figure>
    </div>
  )
}

export default React.memo(Burger)