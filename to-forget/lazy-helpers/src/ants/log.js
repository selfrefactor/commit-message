import { constantCase } from "string-fn"

export const logAnt = label => 
  console.log(`LAZY_HELPERS_${constantCase(label)}`)