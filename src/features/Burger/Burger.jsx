import { useEffect, useState } from 'react'
import style from './Burger.module.scss'
import { $menu } from '../../app/store/menu'
import { useStore } from '@nanostores/react'
import { useAnimations } from '../../app/hooks/useAnimations'
import { $earth } from '../../app/store/earth'

const completedStates = ['closed', 'opened']

const Burger = () => {
  const [isChecked, setIsChecked] = useState(false)
  const menu = useStore($menu)
  const animations = useAnimations()
  const earth = useStore($earth)

  const handleClick = (e) => {
    console.log(!completedStates.includes(menu))
    if (!completedStates.includes(menu)) return e.preventDefault()

    if (menu === 'opened') {
      $menu.set('closing')
      setIsChecked(false)
      animations.menuSectionClose(() => $menu.set('closed'))

      return
    }

    $menu.set('opening')
    setIsChecked(true)
  }

  useEffect(() => {
    if (earth !== 'ready') return

    animations.block({
      selector: `.${style.burger} figure`,
      duration: .35,
      startOffset: '110%',
      delay: .65,
    })
  }, [earth])

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

export default Burger