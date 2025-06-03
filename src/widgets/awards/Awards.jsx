import style from './Awards.module.scss'
import web2023 from '../../assets/img/web_2023.png'
import web2024 from '../../assets/img/web_2024.png'
import web2024Photo from '../../assets/img/web_2024_photo.png'
import itPlanet from '../../assets/img/it_planet.png'
import { useAnimations } from '../../app/hooks/useAnimations'
import { useStore } from '@nanostores/react'
import { $loader } from '../../app/store/loader'
import { useEffect } from 'react'



const Awards = () => {
  const animations = useAnimations()
  const loader = useStore($loader)

  useEffect(() => {
    if (loader !== 'closed') return

    animations.blockChildren({
      selector: 'img',
      direction: 'x',
      startOffset: -50,
      duration: 0.35,
      stagger: 0.15
    })
  }, [loader])

  return (
    <section className={style.awards}>
      <img className={style.award} src={web2024.src} alt='web 2024' />
      <img className={style.award} src={web2024Photo.src} alt='web 2024 photo' />
      <img className={style.award} src={web2023.src} alt='web 2023' />
      <img className={style.award} src={itPlanet.src} alt='it planet' />
    </section>
  )
}

export default Awards
