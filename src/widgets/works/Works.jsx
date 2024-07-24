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
import twopizza from '../../assets/case_cards/twopizza.png'
import crownclother from '../../assets/case_cards/crownclothes.png'
import elitestrike from '../../assets/case_cards/elitestrike.png'
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
      onSlideChange={() => console.log('slide change')}
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
        <WorkSlide path={college.src} link={`/${locale}/cases/college`} />
      </SwiperSlide>
      <SwiperSlide>
        <WorkSlide path={puma.src} link={`/${locale}/cases/puma`} />
      </SwiperSlide>
      <SwiperSlide>
        <WorkSlide path={twopizza.src} link={`/${locale}/cases/twopizza`} />
      </SwiperSlide>
      <SwiperSlide>
        <WorkSlide path={crownclother.src} link={`/${locale}/cases/crownclothes`} />
      </SwiperSlide>
      <SwiperSlide>
        <WorkSlide path={elitestrike.src} link={`/${locale}/cases/elitestrike`} />
      </SwiperSlide>
    </Swiper>
  )
}

function mobile(locale) {
  return (
    <>
      <WorkSlide path={college.src} link={`/${locale}/cases/college`} />
      <WorkSlide path={puma.src} link={`/${locale}/cases/puma`} />
      <WorkSlide path={twopizza.src} link={`/${locale}/cases/twopizza`} />
      <WorkSlide path={crownclother.src} link={`/${locale}/cases/crownclothes`} />
      <WorkSlide path={elitestrike.src} link={`/${locale}/cases/elitestrike`} />
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

    animations.blockChildren({
      selector: '.slide_work',
      direction: 'x',
      startOffset: -100,
      stagger: 0.15,
      duration: 0.3,
    })

    animations.block({
      selector: '.swiper',
      direction: 'x',
      startOffset: -100,
      duration: 0.35,
    })
  }, [loader, isMobile])

  return <section className={style.works}>{isMobile ? mobile(locale) : desktop(locale)}</section>
}

export default Works
