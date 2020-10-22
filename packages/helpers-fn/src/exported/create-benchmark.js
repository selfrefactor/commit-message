const bench = require('benny')
const { ok, maybe } = require('rambdax')
const { snakeCase, constantCase } = require('string-fn')

const folderFallback = 'benchmark_results'

async function createBenchmark(input){
  const [ [ suiteLabel, tests ] ] = Object.entries(input)
  ok(tests, suiteLabel)([ {
    label : String,
    fn    : Function,
  } ], String)

  const benches = tests.map(({ label, fn }) => bench.add(label, fn))
  const folder = maybe(
    input.folder,
    input.folder,
    process.env.BENCHMARK_FOLDER ?
      process.env.BENCHMARK_FOLDER :
      folderFallback
  )

  return bench.suite(
    constantCase(suiteLabel),
    ...benches,
    bench.cycle(),
    bench.complete(),
    bench.save({
      file : snakeCase(suiteLabel),
      folder,
    })
  )
}

exports.createBenchmark = createBenchmark
