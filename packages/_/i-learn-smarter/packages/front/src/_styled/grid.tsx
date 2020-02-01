import styled from 'styled-components'

export const height = 8
export const totalHeight = 90
export const background = '#b0bec5'

function getFractionFn(
  numberFractions: number,
  gutterHeight: number,
  fraction: number,
): number {

  return ((totalHeight - gutterHeight) / numberFractions) * fraction
}

function getSubFractionFn(
  numberFractions: number,
  gutterHeight: number,
  child: number,
  parrent: number,
): number {

  return getFractionFn(numberFractions, gutterHeight, parrent) / child
}

export function fractionGetters(
  numberFractions: number,
  gutterHeight: number,
): FractionGetters {
  const getFraction = (fraction: number) =>
    getFractionFn(numberFractions, gutterHeight, fraction)

  const getSubFraction = (
    child: number,
    parrent: number,
  ) => getSubFractionFn(numberFractions, gutterHeight, child, parrent)

  return { getFraction, getSubFraction }
}

export const ContainerBase = styled.div`
  height: 90vh;
  width: 100vw;    
  display: grid;
`

export const CenteredItem = styled.div`
  text-align: center;
  height: ${height}vh;
`

export const CenteredWithId = id => styled.div.attrs({
  id,
})`
  text-align: center;
  height: ${height}vh;
`

export const Text = styled.div`
  padding-top: ${height * 0.3}vh;
  line-height: ${height * 0.5}vh;
  font-size: ${height * 0.43}vh;
  width: 100%;
`
