import { reject } from 'rambda'

const a = reject((a,c)=> a > 1, [1,2,3])