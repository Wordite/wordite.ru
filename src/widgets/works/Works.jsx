import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, EffectCoverflow } from 'swiper/modules'
import WorkSlide from '../../features/WorkSlide/WorkSlide'
import style from './Works.module.scss'

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

function desktop() {
  return (
    <Swiper
      effect={'coverflow'}
      className={style.slider}
      spaceBetween={30}
      mousewheel={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      loop={true}
      // initialSlide={2}
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
      // onSwiper={(swiper) => console.log(swiper)}
      modules={[Mousewheel, EffectCoverflow]}
    >
      <SwiperSlide>
        <WorkSlide path={college.src} link='/en/cases/college' />
      </SwiperSlide>
      <SwiperSlide>
        <WorkSlide path={puma.src} link='/en/cases/puma' />
      </SwiperSlide>
      <SwiperSlide>
        <WorkSlide path={twopizza.src} link='/en/cases/twopizza' />
      </SwiperSlide>
      <SwiperSlide>
        <WorkSlide path={crownclother.src} link='/en/cases/crownclothes' />
      </SwiperSlide>
      <SwiperSlide>
        <WorkSlide path={elitestrike.src} link='/en/cases/elitestrike' />
      </SwiperSlide>
    </Swiper>
  )
}

function mobile() {
  return (
    <>
      <WorkSlide path={college.src} link='/en/cases/college' />
      <WorkSlide path={puma.src} link='/en/cases/puma' />
      <WorkSlide path={twopizza.src} link='/en/cases/twopizza' />
      <WorkSlide path={crownclother.src} link='/en/cases/crownslothes' />
      <WorkSlide path={elitestrike.src} link='/en/cases/elitestrike' />
    </>
  )
}

let oldIsMobile = false

const Works = () => {
  const isMobile = useStore($isMobile)
  oldIsMobile = isMobile
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
      duration: .3
    })

    animations.block({
      selector: '.swiper ',
      direction: 'x',
      startOffset: -100,
      duration: .35
    })
  }, [loader, isMobile])

  return <section className={style.works}>{isMobile ? mobile() : desktop()}</section>
}

export default Works
