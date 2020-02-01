type InputLabels = 'next' | 'submit'

export function click(label: InputLabels){
  document.getElementById(`icon_${label}`).click()
}
