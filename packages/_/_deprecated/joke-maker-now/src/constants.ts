// INJECT_COMPONENT
// JOKE_MAKER
// ROOT
export const FETCH_READY = 'FETCH_READY'
export const FETCH = 'FETCH'
export const INIT = 'INIT'
export const IGNORE = '**IGNORE'

/**
 * Animation related
 */
export const URL = `${process.env.NGROK_URL}/joke-maker`
export const GUEST_URL = `${process.env.NGROK_URL}/joke-maker/guest`
export const ANIMATION = 1500
export const DELAY_ANIMATION = 600

/**
 * Animation actions
 */
export const ANIMATION_IN = 'ANIMATION_IN'
export const ANIMATION_OUT = 'ANIMATION_OUT'
export const ANIMATION_OFF = 'ANIMATION_OFF'

/**
 * store.status
 */
export const OUT = 'OUT'
export const IN = 'IN'
export const OFF = 'OFF'
export const ON = 'ON'

const LENGTH = 20
const EMPTY = Array(LENGTH).fill('_').join('')
export const EMPTY_WORDS = Array(6).fill(EMPTY)