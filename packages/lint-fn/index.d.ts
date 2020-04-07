type PrettierSpecialCase = 'check' | 'local' | 'outer'
interface ExecPrettier {
  filePath: string
  injectOptions: string
  prettierSpecialCase?:PrettierSpecialCase
}

export function lintFn(
  filePath: string, 
  prettierSpecialCase?:PrettierSpecialCase,
  cwdOverride?:string
): Promise<void>;

export function execPrettier(
  input: ExecPrettier
): Promise<void>