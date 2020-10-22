const bench = require('benny')
const { ok, mapAsync } = require('rambdax')
const { snakeCase, constantCase, dotCase } = require('string-fn')

const folderFallback = 'benchmark_results'

function getFolder(){
  return process.env.BENCHMARK_FOLDER ?
    process.env.BENCHMARK_FOLDER :
    folderFallback
}

function getOutput(input){
  if (!input.includes('#')) return snakeCase(input)
  const [ label, mode ] = input.split('#')

  return `${ snakeCase(label) }.${ dotCase(mode) }`
}

function getLabel(input){
  if (!input.includes('#')) return constantCase(input)
  const [ label, mode ] = input.split('#')

  return `${ constantCase(label) }.${ dotCase(mode) }`
}

async function createBenchmark({ label: topLabel, suites }){
  ok(suites, topLabel)([ {
    label : String,
    fn    : Function,
  } ], String)

  const benches = suites.map(({ label, fn }) => bench.add(label, fn))

  return bench.suite(
    getLabel(topLabel),
    ...benches,
    bench.cycle(),
    bench.complete(),
    bench.save({
      file   : getOutput(topLabel),
      folder : getFolder(),
    })
  )
}

async function createComplexBenchmark(input){
  await mapAsync(createBenchmark, input)
}

exports.createComplexBenchmark = createComplexBenchmark
