import { useStore } from '@nanostores/react'
import style from './Loader.module.scss'
import { useEffect, useRef } from 'react'
import { useAnimations } from '../../app/hooks/useAnimations'
import { $loader } from '../../app/store/loader'
import { $earth } from '../../app/store/earth'

const LoaderContent = () => {
  const titleRef = useRef(null)
  const animations = useAnimations()
  const loader = useStore($loader)
  const earth = useStore($earth)

  useEffect(() => {
    const title = titleRef.current
    const text = title.textContent.split('')
    let html = ''

    text.map((symbol) => (html += `<span>${symbol}</span>`))
    title.innerHTML = html

    animations.loader(() => {
      if (earth === 'loaded') $loader.set('closing')
      else $loader.set('ready')
    })
  }, [])

  useEffect(() => {
    if (earth !== 'loaded') return
    if (loader === 'ready') $loader.set('closing')
  }, [earth, loader])


  return (
    <p ref={titleRef} className={`${style.title} loader_title`}>
      WORDITE
    </p>
  )
}

export default LoaderContent
