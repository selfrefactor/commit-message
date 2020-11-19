import { killVSCode } from './kill-vscode'

test('happy', async () => {
  await killVSCode()
})

