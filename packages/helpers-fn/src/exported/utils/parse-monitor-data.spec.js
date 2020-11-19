import {parseMonitorData} from './parse-monitor-data'
import {data} from '../test-data.json'
import { log } from '../../log/log'

test('happy', () => {
  const toLog = parseMonitorData(data)
  log(toLog, 'obj')
})
