function parse(x){
  try {
    return x.content.toString('utf8')
  } catch (err){
    console.log(err)
  }
}

exports.parse = parse
