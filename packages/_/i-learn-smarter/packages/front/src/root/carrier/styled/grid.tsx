import { getterAnt } from 'client-helpers'
import { NAVY_2 } from 'colors'
import { defaultTo, glue, replace } from 'rambdax'
import styled from 'styled-components'
import { mediaAnt, mediaImportantAnt } from '../../../ants/media'

const gridAreas = glue(`logo 
  c_info
  . . 
  c_changelanguage 
  c_random 
  c_texttospeech 
  c_submit 
  c_next 
  . . .
  points
`)

const gridAreasMobile = replace(
  '. points',
  'points points',
  gridAreas,
)

const {points} = getterAnt({points: 0})

const mediaInput = `grid-template-areas: "${gridAreasMobile}";`
const maybeTwoColumns = points > 999 ?
  mediaImportantAnt(mediaInput) :
  mediaAnt(mediaInput)

export const Container = styled.div`
  grid-template-areas: "${gridAreas}";
  position: absolute;
  top: 92vh;
  width: 100%;
  height: 8vh;
  left: 0;
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  svg, canvas {
    cursor: pointer;
  }
  ${maybeTwoColumns}
`

const CarrierItem = styled.div`
  width: 8vw;
  height: 10vh;
`

export const LogoCell = styled(CarrierItem)`
  grid-area: logo;
`

export function createIconCell(
  namespace: string,
  hover?: boolean,
) {
  const size = 40
  const className = defaultTo(true, hover) ?
    'hvr-pulse' :
    ''

  const inner = styled.canvas.attrs({
    height: size,
    id: `icon_${namespace}`,
    width: size,
  }) ``

  const outer = styled.div.attrs({
    className,
  }) `
    grid-area: c_${namespace};
    height: 8vh;
    text-align: center;  
    width: 7.8vw;
  `

  return { inner, outer }
}

export const Points = styled(CarrierItem)`
  padding-top: 7%;
  cursor: none;
  font-family: 'Kranky', cursive;
  font-size: 5vh;
  line-height: 5vh;
  color: ${NAVY_2};
  grid-area: points;
`
