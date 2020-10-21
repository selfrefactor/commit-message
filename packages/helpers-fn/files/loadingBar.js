function loadingBar(totalLength){
  let counter = -1

  return () => {
    counter = counter === totalLength ? 0 : counter + 1

    return '🀰'.repeat(counter) + '🀱'.repeat(totalLength - counter)
  }
}

exports.loadingBar = loadingBar
