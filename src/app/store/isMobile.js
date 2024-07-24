import { atom } from 'nanostores'

export const $isMobile = atom(typeof window !== 'undefined' ? window.innerWidth <= 1024 : null)

if (typeof window !== 'undefined') window.addEventListener('resize', () => $isMobile.set(window.innerWidth <= 1024))


