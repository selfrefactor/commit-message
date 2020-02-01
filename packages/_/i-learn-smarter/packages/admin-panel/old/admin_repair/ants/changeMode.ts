import { classnames } from 'classnames'

export function changeModeAnt(mode, loaded){
  return classnames({
    fa: true,
    'fa-2x': true,
    'fa-cubes': mode === 'RELATED' && loaded,
    'fa-flask': mode === 'IMAGELESS',
    'fa-image': mode === 'IMAGEFULL',
  })
}
