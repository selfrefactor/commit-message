interface DoModule{
  mode: 'NODE' | 'REACT' | 'ALL'
  srcDirectory: string
  packageJson: string
}
export function doModule(input: DoModule): Promise<void>
export function check(srcDirectory: string): Promise<void>