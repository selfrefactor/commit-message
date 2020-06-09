function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const sendMessage = ({ id, message, payload = {} }) => {
  chrome.tabs.sendMessage(id, { [ message ] : true, payload })
}

chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.query({
    active        : true,
    currentWindow : true,
  }, tabs => {
    const {id, url } = tabs[0]  
    sendMessage({
      id,
      message : 'lazyHelpers',
    })
  })
})

chrome.contextMenus.create({
  contexts : [ 'all' ],
  id       : 'lazy.helpers',
  title    : 'lazy.helpers',
})

let toggleMuteStatus = false
let intervalHolder = null
const COUNTER = random(10, 20)

chrome.contextMenus.onClicked.addListener(() => {
  toggleMuteStatus = !toggleMuteStatus
  if (intervalHolder !== null) clearInterval(intervalHolder)
  if (!toggleMuteStatus) return

  let muted = false
  let counter = 0

  chrome.tabs.query({
    currentWindow : true,
    audible       : true,
  }, tabs => {
    if (tabs.length !== 1) return toggleMuteStatus = false

    const { id } = tabs[ 0 ]
    const ms = random(1000 * 20, 1000 * 50)

    intervalHolder = setInterval(() => {
      counter++

      if (counter === COUNTER) {
        counter = 0
        muted = true
        chrome.tabs.update(id, { muted : true })
      } else if (muted) {
        muted = false
        chrome.tabs.update(id, { muted : false })
      }
    }, ms)
  })
})
