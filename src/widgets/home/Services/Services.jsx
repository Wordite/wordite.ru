import { useStore } from '@nanostores/react'
import cofffee from '../../../assets/img/coffee_img.png'
import Service from '../../../entities/Service/Service'
import style from './Services.module.scss'
import { $section } from '../../../app/store/section'
import { useAnimations } from '../../../app/hooks/useAnimations'
import React, { useEffect } from 'react'


const Services = () => {
  const section = useStore($section)
  const animations = useAnimations(true)

  useEffect(() => {
    if (section !== 3) return animations.reset()

    animations.block({
      selector: '.' + style.coffee,
      direction: 'y',
      endOffset: '100%',
      duration: 0.45,
      opacity: 1,
      ease: 'power1.out',
    })

    animations.blockChildren({
      selector: '.' + style.list + ' figure',
      direction: 'x',
      endOffset: 0,
      duration: 0.45,
      stagger: 0.15,
    })

    animations.class({
      selector: '.' + style.title,
      className: 'active',
    })

    animations.class({
      selector: '.' + style.services,
      className: style.active,
    })

  }, [section])

  return (
    <section className={style.services}>
      <img className={style.coffee} src={cofffee.src} alt='coffee' />
      <h2 className={style.title + ' text_dark'}>SERVICES</h2>

      <div className={style.list}>
        <Service title='LANDING' text='one page website that presents your product' />
        <Service title='MULTIPAGE' text='one page website that presents your product' />
        <Service title='SHOP' text='one page website that presents your product' />
        <Service title='WEB APP' text='one page website that presents your product' />
      </div>
    </section>
  )
}

export default React.memo(Services)
