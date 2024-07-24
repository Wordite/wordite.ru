import eliteWork from '../../assets/portfolio/elitestrike.png'
import { useStore } from '@nanostores/react'
import { $isMobile } from '../../app/store/isMobile'
import { useEffect } from 'react'
import { useAnimations } from '../../app/hooks/useAnimations'
import { $loader } from '../../app/store/loader'
import { $locale } from '../../app/store/locale'
import { useTranslations } from '../../app/i18n/utils'

const EliteStrike = () => {
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
      <h1>{t('eliteStrike.title')}</h1>
      <h3>{t('eliteStrike.stack')}</h3>
      <img className='case' src={eliteWork.src} alt={t('eliteStrike.image.alt')} />
    </>
  )
}

export default EliteStrike
