interface Input{
  filePath: string 
  prettierFlag?: boolean 
  fixFlag?: boolean
  logFlag?: boolean
}

export function lintFn(input: Input): Promise<any>