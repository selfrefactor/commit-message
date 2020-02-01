export function isLocal() {
  return process.cwd().startsWith('/home/s/')
}