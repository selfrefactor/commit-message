function formatJson(input){
  try {
    const parsed = JSON.parse(input)
    const asString = JSON.stringify(
      parsed, null, 2
    )

    return asString
  } catch (e){
    return false
  }
}

exports.formatJson = formatJson
