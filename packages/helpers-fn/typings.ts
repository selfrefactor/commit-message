import {monitor, Monitor} from '.'

void async function foo(){
  await monitor.start()
  const monitorInstance = new Monitor()
  await monitorInstance.start()
}