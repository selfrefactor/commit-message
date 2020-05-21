process.env.DEP_FN_UPDATE_ALL = 'true'

import {renovate} from './renovate'
import {special} from './special'
import {update} from './update'

// special('rambda')

// renovate('jest')

update()
