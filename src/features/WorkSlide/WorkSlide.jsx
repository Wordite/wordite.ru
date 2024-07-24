// import style from './WorkSlide.module.scss'

// const WorkSlide = ({ link = '', path }) => {
//   let isLeaved = false
//   let lastMouseEnter = Date.now()
//   let isOnSecondStep = false
//   let isSquareHidden = false

//   const mouseEnter = (e) => {
//     const el = e.currentTarget
//     if (Date.now() - lastMouseEnter < 700) return console.log(lastMouseEnter)

//     isLeaved = false
//     lastMouseEnter = Date.now()
//     isOnSecondStep = false

//     el.style.setProperty('--square1x', '0')
//     el.style.setProperty('--square1y', '0')

//     el.style.setProperty('--square2x', '0')
//     el.style.setProperty('--square2y', '0')

//     el.style.setProperty('--square3x', '0')
//     el.style.setProperty('--square3y', '0')

//     el.style.setProperty('--square4x', '0')
//     el.style.setProperty('--square4y', '0')

//     setTimeout(() => {
//       if (isLeaved) return

//       el.style.setProperty('--rect1x', '0')
//       el.style.setProperty('--rect2x', '0')

//       isOnSecondStep = true
//     }, 350)

//     setTimeout(() => {
//       if (isLeaved) return

//       el.style.setProperty('--sqare-opacity', '0')
//       isSquareHidden = true
//     }, 700)

//     setTimeout(() => {
//       if (isLeaved) return

//       el.style.setProperty('--rect1x', '50%')
//       el.style.setProperty('--rect2x', '50%')

//       el.style.setProperty('--rect-width', '0')
//     }, 750)
//   }

//   const mouseLeave = (e) => {
//     const el = e.currentTarget
//     isLeaved = true

//     if (!isLeaved) return

//     if (isOnSecondStep) {
//       el.style.setProperty('--rect-width', '50%')

//       el.style.setProperty('--rect1x', '0')
//       el.style.setProperty('--rect2x', '0')

//       setTimeout(() => {
//         el.style.setProperty('--rect1x', '-50%')
//         el.style.setProperty('--rect2x', '-50%')

//         el.style.setProperty('--square1x', '-50%')
//         el.style.setProperty('--square1y', '-50%')

//         el.style.setProperty('--square2x', '-50%')
//         el.style.setProperty('--square2y', '-50%')

//         el.style.setProperty('--square3x', '-50%')
//         el.style.setProperty('--square3y', '-50%')

//         el.style.setProperty('--square4x', '-50%')
//         el.style.setProperty('--square4y', '-50%')
//       }, 350)

//       if (isSquareHidden) setTimeout(() => el.style.setProperty('--sqare-opacity', '1'), 700)

//       return
//     }

//     el.style.setProperty('--square1x', '-50%')
//     el.style.setProperty('--square1y', '-50%')

//     el.style.setProperty('--square2x', '-50%')
//     el.style.setProperty('--square2y', '-50%')

//     el.style.setProperty('--square3x', '-50%')
//     el.style.setProperty('--square3y', '-50%')

//     el.style.setProperty('--square4x', '-50%')
//     el.style.setProperty('--square4y', '-50%')
//   }

//   return (
//     <a href={link} target='_blank'>
//       <figure className={style.work} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
//         <div className={style.square}></div>
//         <div className={style.square}></div>
//         <div className={style.square}></div>
//         <div className={style.square}></div>

//         <img src={path} alt='some' />
//       </figure>
//     </a>
//   )
// }

// export default WorkSlide


import style from './WorkSlide.module.scss'

const WorkSlide = ({ link = '', path }) => {
  return (
    <a href={link}>
      <figure className={`${style.work} slide_work`}>
        <img src={path} alt='some' />
      </figure>
    </a>
  )
}

export default WorkSlide
