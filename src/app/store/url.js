import { atom } from 'nanostores'

export const $url = atom(typeof window !== 'undefined' ? window.location.href : null)



