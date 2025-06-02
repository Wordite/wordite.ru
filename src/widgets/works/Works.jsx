import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, EffectCoverflow } from 'swiper/modules'
import WorkSlide from '../../features/WorkSlide/WorkSlide'
import style from './Works.module.scss'

import { $locale } from '../../app/store/locale'
import { useTranslations } from '../../app/i18n/utils'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import './Works.scss'

import college from '../../assets/case_cards/college.png'
import puma from '../../assets/case_cards/puma.png'
import elitestrike from '../../assets/case_cards/elitestrike.png'
import findproducts from '../../assets/case_cards/findproducts.png'
import cardio from '../../assets/case_cards/cardio.png'
import coffee from '../../assets/case_cards/coffee.png'
import tggame from '../../assets/case_cards/tggame.png'

import { useStore } from '@nanostores/react'
import { $isMobile } from '../../app/store/isMobile'
import { useEffect } from 'react'
import { useAnimations } from '../../app/hooks/useAnimations'
import { $loader } from '../../app/store/loader'

function desktop(locale) {
  return (
    <Swiper
      effect={'coverflow'}
      className={style.slider}
      spaceBetween={30}
      mousewheel={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      loop={true}
      simulateTouch={false}
      speed={1200}
      coverflowEffect={{
        rotate: 5,
        stretch: -100,
        depth: 200,
        modifier: 1,
        slideShadows: false,
      }}
      breakpoints={{
        768: {
          spaceBetween: 30,
        },
      }}
      modules={[Mousewheel, EffectCoverflow]}
    >
      <SwiperSlide>
        <WorkSlide path={tggame.src} link={`/${locale}/cases/tggame`} />
      </SwiperSlide>
      <SwiperSlide>
        <WorkSlide path={college.src} link={`/${locale}/cases/college`} />
      </SwiperSlide>
      <SwiperSlide>
        <WorkSlide path={puma.src} link={`/${locale}/cases/puma`} />
      </SwiperSlide>
      <SwiperSlide>
        <WorkSlide path={findproducts.src} link={`/${locale}/cases/findproducts`} />
      </SwiperSlide>
      <SwiperSlide>
        <WorkSlide path={elitestrike.src} link={`/${locale}/cases/elitestrike`} />
      </SwiperSlide>

      <SwiperSlide>
        <WorkSlide path={cardio.src} link={`/${locale}/cases/cardio`} />
      </SwiperSlide>
      <SwiperSlide>
        <WorkSlide path={coffee.src} link={`/${locale}/cases/coffee`} />
      </SwiperSlide>
    </Swiper>
  )
}

function mobile(locale) {
  return (
    <>
      <WorkSlide path={tggame.src} link={`/${locale}/cases/tggame`} />
      <WorkSlide path={college.src} link={`/${locale}/cases/college`} />
      <WorkSlide path={puma.src} link={`/${locale}/cases/puma`} />
      <WorkSlide path={findproducts.src} link={`/${locale}/cases/findproducts`} />
      <WorkSlide path={elitestrike.src} link={`/${locale}/cases/elitestrike`} />
      <WorkSlide path={cardio.src} link={`/${locale}/cases/cardio`} />
      <WorkSlide path={coffee.src} link={`/${locale}/cases/coffee`} />
    </>
  )
}

let oldIsMobile = false

const Works = () => {
  const isMobile = useStore($isMobile)
  const locale = useStore($locale)
  const animations = useAnimations()
  const loader = useStore($loader)

  useEffect(() => {
    if (loader !== 'closed') return
    if (loader !== 'closed' && isMobile !== oldIsMobile) oldIsMobile = isMobile

    animations.class({
      selector: '.slide_work',
      isForChildren: true,
      stagger: 200,
      delay: 0,
      className: 'active',
    })

    Array.from(document.body.querySelectorAll('.swiper-slide')).forEach((el, i) => {
      setTimeout(() => el.style.setProperty('--shadow-opacity', '1'), i * 340)
    })

    animations.block({
      selector: '.swiper',
      direction: 'x',
      startOffset: 0,
      duration: 0.35,
    })
  }, [loader, isMobile])

  return <section className={style.works}>{isMobile ? mobile(locale) : desktop(locale)}</section>
}

export default Works
