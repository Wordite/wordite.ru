import style from './Photos.module.scss'

import photo_1 from '../../../assets/img/my_photo_1.png'
import photo_2 from '../../../assets/img/my_photo_2.png'
import photo_3 from '../../../assets/img/my_photo_3.png'
import React, { useEffect, useState } from 'react'
import { enterView } from '../../../app/js/enterView'
import { useAnimations } from '../../../app/hooks/useAnimations'

const Photos = () => {
  const animations = useAnimations()

  useEffect(() => {
    enterView({
      target: '.' + style.photo,
      enter: () => {
        animations.blockChildren({
          selector: '.' + style.photo,
          direction: 'x',
          startOffset: -100,
          stagger: 0.15,
        })

        animations.class({
          selector: '.' + style.title,
          className: 'active'
        })
      },
      exit: () => {
        animations.reset()
      }
    })
  }, [])

  return (
    <section className={style.photos}>
      <h2 className={style.title + ' text'}>HOVER TO SEE MY PHOTOS</h2>

      <div className={style.content}>
        <figure className={style.photo}>
          <div className={style.mask}>
            <p>WAIT YOUR MOUSE</p>
          </div>
          <img src={photo_2.src} className={style.image} alt='my photo' />
        </figure>

        <figure className={style.photo}>
          <div className={style.mask}>
            <p>WAIT YOUR MOUSE</p>
          </div>
          <img src={photo_3.src} className={style.image} alt='my photo' />
        </figure>

        <figure className={style.photo}>
          <div className={style.mask}>
            <p>WAIT YOUR MOUSE</p>
          </div>
          <img src={photo_1.src} className={style.image} alt='my photo' />
        </figure>
      </div>
    </section>
  )
}

export default React.memo(Photos)
