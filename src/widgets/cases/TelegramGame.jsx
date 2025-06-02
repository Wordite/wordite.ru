import telegramGame from '../../assets/portfolio/telegram_game.mp4'
import telegramGameWebm from '../../assets/portfolio/telegram_game.webm'

import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { useAnimations } from '../../app/hooks/useAnimations'
import { $loader } from '../../app/store/loader'

import { $locale } from '../../app/store/locale'
import { useTranslations } from '../../app/i18n/utils'

const TelegramGame = () => {
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
      <h1>Telegram game</h1>
      <h3>STACK: React, Tailwind, Redux Toolkit, GSAP</h3>
      <h3>GITHUB REP: <a href="https://github.com/Wordite/telegram-game" target='_blank'>https://github.com/Wordite/telegram-game</a></h3>
      <video className='case' alt={t('college.image.alt')} autoPlay muted loop playsInline>
        <source src={telegramGameWebm} type='video/webm' />
        <source src={telegramGame} type='video/mp4' />
      </video>
    </>
  )
}

export default TelegramGame
