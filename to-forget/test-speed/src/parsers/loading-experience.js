function parseLoadingExperience({ overall_category, metrics }){
  const scoreCounter = {
    slow : 0,
    fast : 0,
  }
  const partialParse = input => {
    if (input.category === 'SLOW') scoreCounter.slow++
    if (input.category === 'FAST') scoreCounter.fast++

    return {
      value : input.percentile,
      score : input.category.toLowerCase(),
    }
  }

  return {
    scoreCounter,
    overallScore : overall_category.toLowerCase(),
    details      : {
      inputDelay   : partialParse(metrics.FIRST_INPUT_DELAY_MS),
      firstPaint   : partialParse(metrics.FIRST_CONTENTFUL_PAINT_MS),
      lauoutShift  : partialParse(metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE),
      largestPaint : partialParse(metrics.LARGEST_CONTENTFUL_PAINT_MS),
    },
  }
}

exports.parseLoadingExperience = parseLoadingExperience
