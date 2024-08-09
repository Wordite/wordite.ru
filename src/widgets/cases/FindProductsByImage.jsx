import findProducts from '../../assets/portfolio/find_products_by_images.mp4'
import findProductsWebm from '../../assets/portfolio/find_products_by_images.webm'

import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { useAnimations } from '../../app/hooks/useAnimations'
import { $loader } from '../../app/store/loader'

import { $locale } from '../../app/store/locale'
import { useTranslations } from '../../app/i18n/utils'

const FindProductsByImage = () => {
  const animations = useAnimations()
  const loader = useStore($loader)
  const locale = useStore($locale)
  const t = useTranslations(locale)

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
      delay: 0.15,
    })

    animations.block({
      selector: '.case',
      direction: 'x',
      startOffset: -50,
      duration: 0.35,
      delay: 0.3,
    })
  }, [loader])

  return (
    <>
      <h1>Find products</h1>
      <h3>STACK: Astro, JS, HTML, CSS</h3>
      <video className='case' alt={t('college.image.alt')} autoPlay muted loop playsInline>
        <source src={findProductsWebm} type='video/webm' />
        <source src={findProducts} type='video/mp4' />
      </video>
    </>
  )
}

export default FindProductsByImage
