import DivMouseBlock from '../../../shared/MouseBackgrounds/DivMouseBlock/DivMouseBlock'
import style from './Contact.module.scss'


const Contact = () => {
  return (
    <section className={style.contact}>

        <h3 className={style.title}>CONTACT</h3>

        <form action="" className={style.form}>
            <input className={style.input} type="text" placeholder='Your name' />

            <p className={style.subtitle}>I want to talk in...</p>
            <div className={style.socialButtons}>
              <DivMouseBlock>Email</DivMouseBlock>
              <DivMouseBlock>Telegram</DivMouseBlock>
            </div>
        </form>
    </section>
  )
}

export default Contact
