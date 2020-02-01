export function enterOnInputAnt(e: KeyEvent){
  return (
    e.key === 'Enter' &&
    (document.activeElement as any).placeholder !== 'Search Image'
  )
}
