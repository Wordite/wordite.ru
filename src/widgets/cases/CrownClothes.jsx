import crown from '../../assets/portfolio/crown.png'
import { useStore } from '@nanostores/react'
import { $isMobile } from '../../app/store/isMobile'
import { useEffect } from 'react'
import { useAnimations } from '../../app/hooks/useAnimations'
import { $loader } from '../../app/store/loader'

const CrownClothes = () => {
  const animations = useAnimations()
  const loader = useStore($loader)

  useEffect(() => {
    if (loader !== 'closed') return

    animations.block({
      selector: 'h1',
      direction: 'x',
      startOffset: -50,
      duration: 0.35,
    })

    animations.block({
      selector: 'h3',
      direction: 'x',
      startOffset: -50,
      duration: 0.35,
      delay: 0.15
    })

    animations.block({
      selector: '.case',
      direction: 'x',
      startOffset: -50,
      duration: 0.35,
      delay: 0.3
    })
  }, [loader])
  return (
    <>
      <h1>Crown Clothes</h1>
      <h3>STACK: NEXT.JS, SCSS, REDUX, EXPRESS, MONGO</h3>

      <img class='case' src={crown.src} alt='case' />
    </>
  )
}

export default CrownClothes
