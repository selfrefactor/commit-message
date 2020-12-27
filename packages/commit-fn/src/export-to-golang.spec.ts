import { exportToGolang } from './export-to-golang'
import { outputFile } from "fs-extra";

test('happy', async () => {
  const result = exportToGolang()
  await outputFile(
    `${__dirname}/commit.go`,
    result
  )
})