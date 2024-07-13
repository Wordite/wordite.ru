import { useEffect, useRef } from 'react'
import style from './Loader.module.scss'
import { useAnimations } from '../../app/hooks/useAnimations'
import { useStore } from '@nanostores/react'
import { $loader } from '../../app/store/loader'

const Loader = ({ children }) => {
  const loader = useStore($loader)
  const animations = useAnimations()
  const loaderRef = useRef(null)

  useEffect(() => {
    if (loader !== 'closing') return

    animations.closeLoader(() => {
      $loader.set('closed')
      loaderRef.current.style.display = 'none'
    })
  }, [loader])

  return (
    <div ref={loaderRef} className={`${style.loader} loader`}>
      <div className={`${style.background} loader_background`}></div>
      <div className={`${style.background} loader_background`}></div>
      <div className={`${style.background} loader_background`}></div>
      <div className={`${style.background} loader_background`}></div>
      <div className={`${style.background} loader_background`}></div>
      <div className={`${style.background} loader_background`}></div>
        {/* <p className={`${style.loading} ${style.stroke}`}>LOADING</p>
        <p className={style.loading}>LOADING</p> */}
      {children}
    </div>
  )
}

export default Loader
