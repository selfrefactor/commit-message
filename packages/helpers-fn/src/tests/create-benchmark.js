process.env.BENCHMARK_FOLDER = 'files/experimental_results'
const { createComplexBenchmark, scanFolder } = require('../index')
const { mapAsync } = require('rambdax')
const { parse } = require('path')

const benchmarksDir = `${ __dirname }/benchmarks`

async function getAllBenchmarks(){
  const files = await scanFolder({ folder : benchmarksDir })

  return files
    .filter(filePath => !filePath.includes('benchmark_results'))
    .map(filePath => parse(filePath).name)
}

async function runAll(){
  const methodsWithBenchmarks = await getAllBenchmarks()
  const iterable = async singleMethod => {
    const required = require(`${ benchmarksDir }/${ singleMethod }.js`)
    createComplexBenchmark(required)
  }

  await mapAsync(iterable, methodsWithBenchmarks)
}

runAll()
