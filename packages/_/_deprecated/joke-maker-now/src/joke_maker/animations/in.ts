const start = {
  ['animation-timing-function']: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  opacity: 0,
  transform: 'scale3d(1, 1, 1)',
}
const middle = {
  ['animation-timing-function']: 'cubic-bezier(0.42, 0, 0.58, 1)',
  opacity: 0.5,
  transform: 'scale3d(1.18, 1.18, 1.18)',
}
const end = {
  ['animation-timing-function']: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  opacity: 1,
  transform: 'scale3d(1, 1, 1)',
}

const animation = [
  start,
  middle,
  end,
]
  
export function inAnimation(ms = 1500, loopDelay = 600){
  const els = Array.from(document.querySelectorAll('#animation'))
  const singleStepDelay = Math.floor(loopDelay/6)

  const animateElement = (el: any, i: number) => 
    el.animate(animation, {
      direction: 'normal',
      duration: ms,
      easing: 'ease-in',
      iterations: 1,
      delay: i * singleStepDelay,
      fill: 'forwards'
    })

  els.map(animateElement)
}
