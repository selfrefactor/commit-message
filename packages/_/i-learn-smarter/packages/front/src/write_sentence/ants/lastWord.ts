export function lastWordAnt(): any{
  const container = document.getElementById('ws_answer')
  // Happens only if from auto.mode navigate somewhare else
  ///////////////////////////
  if (container === null) return window.location.reload(false)

  const last = container.querySelectorAll('span:last-child')[0]

  return window.getComputedStyle(last).visibility === 'visible'
}
