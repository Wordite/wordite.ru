import { $isMobile } from '../store/isMobile'
import { $menu } from '../store/menu'
import { useAnimations } from './useAnimations'

export function useCloseMenu() {
  return function () {
    const animations = useAnimations()

    if ($menu.get() === 'opened' || $menu.get() === 'opening') {
      $menu.set('closing')

      if ($isMobile.get()) animations.mobileMenuSectionClose(() => $menu.set('closed'))
      else animations.menuSectionClose(() => $menu.set('closed'))
    }
  }
}

const closeMenu = useCloseMenu()
if (typeof window !== 'undefined') window.addEventListener('resize', closeMenu)



