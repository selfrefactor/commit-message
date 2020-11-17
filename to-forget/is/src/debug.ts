import { is, isx } from './'

const asyncFnFirst = async () => {}
const asyncFnSecond = async () => {}

const typingsLocation = '/home/just/cold/is/src/test.d.ts'
is('init', typingsLocation)