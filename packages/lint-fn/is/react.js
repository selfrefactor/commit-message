exports.isReact = (filePath, content) => {
  if(filePath.endsWith('component.jsx')) return true
  if(filePath.endsWith('component.js')) return true
  if(content.includes(`'react'`)) return true
  if(content.includes(`"react"`)) return true

  return false
}