import style from '../MouseBackground.module.scss'


const LinkMouseBlock = ({children, className, href}) => {
  const circles = []

  const mouseMove = (e) => {
    const span = circles[circles.length - 1]
    if (!span) return

    const container = e.currentTarget
    const coords = container.getBoundingClientRect()
    const x = e.clientX - coords.left
    const y = e.clientY - coords.top

    span.style.top = `${y}px`
    span.style.left = `${x}px`
  }

  const mouseEnter = (e) => {
    const container = e.currentTarget

    const span = document.createElement('span')
    span.classList.add(style.background)

    container.append(span)

    setTimeout(() => {
      span.style.transform = `translate3d(-50%,-50%,0) scale(50)`
    }, 0)

    circles.push(span)
  }

  const mouseLeave = () => {
    const el = circles.pop()
    if (!el) return

    el.style.transform = `translate3d(-50%,-50%,0) scale(0)`

    setTimeout(() => el.remove(), 600)
  }

  return (
    <a href={href} className={`${className} ${style.link}`} onMouseMove={mouseMove} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
        <p className={style.content}>
          {children}
        </p>
    </a>
  )
}

export default LinkMouseBlock
