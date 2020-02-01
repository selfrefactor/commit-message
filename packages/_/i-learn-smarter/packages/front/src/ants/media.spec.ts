import { mediaAnt, mediaImportantAnt } from './media'
import { glue } from 'rambdax'

test('media', () => {
  const result = mediaAnt('grid-template-areas: "fiu fio";')
  const expected = glue(`@media (max-width: 800px) {
    grid-template-areas: "fiu fio";    
  }
  @media (max-height: 800px) {
    grid-template-areas: "fiu fio";
  }`)
  expect(result).toBe(expected)
})

test('mediaImportant', () => {
  const result = mediaImportantAnt('grid-template-areas: "fiu fio";')
  const expected = glue(`@media (max-width: 2800px) {
    grid-template-areas: "fiu fio";    
  }`)
  expect(result).toBe(expected)
})
