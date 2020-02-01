const configBase = require('../app.json')
const dataRaw = require('/home/s/repos/front/files/db.json')
const {
  allTrue,
  filter,
  map,
  piped,
  pluck,
  change,
  produce,
} = require('rambdax')
const { writeFileSync } = require('fs')

function populate(){
  const { fromLanguage, toLanguage } = configBase.expo.extra
  const fromKey = `${ fromLanguage.toLowerCase() }Part`
  const toKey = `${ toLanguage.toLowerCase() }Part`
  const data = pluck('doc', dataRaw.rows)
  const result = piped(
    data,
    filter(x => allTrue(
      () => x[ fromKey ],
      () => x[ fromKey ].length > 0,
      () => x[ fromKey ].length < 94,
      () => x[ toKey ],
      () => x[ toKey ].length > 0,
    )),
    map(produce({
      from : x => x[ fromKey ],
      to   : x => x[ toKey ],
    }))
  )

  const config = change(
    configBase,
    'expo.extra',
    { len : result.length }
  )

  writeFileSync('db.json', JSON.stringify(result, null, 2))
  writeFileSync('app.json', JSON.stringify(config, null, 2))
  console.log('populated')
}

populate()
