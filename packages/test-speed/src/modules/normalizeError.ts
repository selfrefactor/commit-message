export function normalizeError(err: any) {
  
  return err !== null && err.message ? err.message : err
}
