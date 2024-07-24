import { atom } from 'nanostores'

export const $isHome = atom((typeof window !== 'undefined' && document.body.querySelector('#home')) ? true : null)



