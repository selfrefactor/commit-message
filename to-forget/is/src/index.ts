import { log as logModule } from 'helpers-fn'
import { type } from 'rambdax'
import {
  CONTINUE,
  INIT_MODE,
  STOP,
} from './constants'

import { isArraySchema } from './helpers/isArraySchema'
import { isInterfaceListMatch } from './helpers/isInterfaceListMatch'
import { isInterfaceMatch } from './helpers/isInterfaceMatch'
import { isSimpleSchema } from './helpers/isSimpleSchema'
import { array } from './modules/array'
import { init } from './modules/init'
import { interfaceListMatch } from './modules/interfaceListMatch'
import { interfaceMatch } from './modules/interfaceMatch'
import { simple } from './modules/simple'

let interfacesValue: object
let allInterfaces: object
let initFlag = true

const log = (label, input) => {
  if (process.env.IS_DEBUG === 'true') {
    logModule(label, 'bar')

    const method = type(input) === 'Object' ?
      'obj' :
      'info'

    logModule(input, method)
  }
}

function catchInitMode(input: any, schema: string): string {

  if (input === INIT_MODE) {
    if (!initFlag) {
      /**
       * One initialization is allowed
       */

      return STOP
    }

    initFlag = false
    
    /**
     * In this case the second argument acts as filePath argument
     */
    const initResult: InitResult = init(schema)

    interfacesValue = initResult.interfaces
    allInterfaces = initResult.allInterfaces

    log('interfaces', initResult)

    /**
     * leave the space after `allInterfaces`_
     * as this is signal for end of single logic step_
     * in this case both interfaces are initialized successfully
     */
    const numberInterfaces = Object.keys(interfacesValue).length

    const logInfo = numberInterfaces > 0 ?
      `Initialized ${numberInterfaces} number of interfaces` :
      'No interfaces found'

    log('init', logInfo)

    return STOP
  }

  return CONTINUE
}

function isBase(input: any, schema: string, optionalFlag: boolean): any {
  const catchInitModeResult = catchInitMode(input, schema)
  if (catchInitModeResult === STOP) {

    return
  }

  if (isSimpleSchema(schema)) {

    return simple(input, schema)
  }

  if (isArraySchema(schema)) {

    return array(input, schema)
  }

  const interfaces = optionalFlag ?
    allInterfaces :
    interfacesValue

  if (isInterfaceListMatch(schema, interfaces)) {
    log('isInterfaceListMatch', { input, schema, interfaces })

    return interfaceListMatch({ input, schema, interfaces })
  }

  if (isInterfaceMatch(schema, interfaces)) {
    log('isInterfaceMatch', { input, schema, interfaces })

    return interfaceMatch({ input, schema, interfaces })
  }

  return false
}

export function is(input: any, schema: string) {

  return isBase(input, schema, false)
}

export function isx(input: any, schema: string) {

  return isBase(input, schema, true)
}
