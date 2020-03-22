export function lintFn(filePath: string): Promise<void>;
interface ExecPrettier {
  filePath: string
  injectOptions: string
}
export function execPrettier(input: ExecPrettier): Promise<void>