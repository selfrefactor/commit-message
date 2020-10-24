export function $(selector){
  return document.querySelector(selector)
}

export function $$(selector){
  return Array.from(document.querySelectorAll(selector))
}