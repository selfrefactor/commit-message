import { setter, getter, delay } from 'rambdax'

function work(parent, src, id){
  const portal = document.createElement('portal')
  if (!portal || !parent) return
  portal.src = src
  parent.appendChild(portal)

  if (id){

    portal.id = 'second'
    setter('PORTAL_SECOND', portal)
  } else {

    setter('PORTAL', portal)
  }

  parent.appendChild(portal)
}

export async function appendPortal({ accepted_answer_id, link }){
  const answer = `${ link }/${ accepted_answer_id }#${ accepted_answer_id }`
  const parent = document.getElementById('portal')
  const parentSecond = document.getElementById('portal-second')
  if (getter('PORTAL')){
    parent.removeChild(getter('PORTAL'))
    parentSecond.removeChild(getter('PORTAL_SECOND'))
  }

  work(parent, link)
  await delay(500)
  work(parentSecond, answer, 'second')
}
