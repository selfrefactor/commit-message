const { resolve } = require('path')
const { writeFileSync, readFileSync } = require('fs')
const { pascalCase } = require('string-fn')
const { ok, pluck, filter,pick,  s, map } = require('rambdax')
s()

const SEP = ','

async function cram(from, to){
  ok(from,to)(['bg','en','de'])
  const outputKey = pascalCase(`${from}.${to}`)
  const OUTPUT = `${__dirname}/cram${outputKey}.txt`

  const db = JSON.parse(
    readFileSync(
      resolve(
        __dirname,
        '../db.json'
      )
    ).toString()
  )

  const cramData = db.rows
    .s(pluck('doc'))
    .s(
      filter(x => {
        if([from,to].includes('bg') === false) return true

        return x.bgWord && x.bgWord.length > 0
      })
    )
    .s(
      map(x => {
        const picked = pick(`${from}Word,${to}Word`,x)
        if(Object.keys(picked).length <= 1) return false
        if(picked[`${from}Word`].length === 0) return false  
        return picked
      })
    )
    .s(filter(Boolean))
    .s(
      map(
        x => `${x[`${from}Word`]}${SEP}${x[`${to}Word`]}`
      )
    )
    .s(x => x.join('\n'))
  
  writeFileSync(OUTPUT, cramData)  
}

cram('en','de')