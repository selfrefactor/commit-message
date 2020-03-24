type PrettierSpecialCase = 'check' | 'local' | 'outer'

export function lintFn(filePath: string, prettierSpecialCase?:PrettierSpecialCase): Promise<void>;
interface ExecPrettier {
  filePath: string
  injectOptions: string
}
export function execPrettier(input: ExecPrettier): Promise<void>