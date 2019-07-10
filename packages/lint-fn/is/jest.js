exports.isJest = filePath => {
  if(filePath.endsWith('spec.jsx')) return true
  if(filePath.endsWith('spec.js')) return true

  return false
}