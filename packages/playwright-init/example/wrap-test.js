export async function wrapTest(
  { browser, executeTest, _ },
  label,
  evaluateResult = x => {}
){
  try {
    const result = await executeTest()
    await browser.close()
    evaluateResult(result)
  } catch (e){
    await _.snap(`${ label }.error`)
    await browser.close()
    expect(true).toBe(false)
  }
}
