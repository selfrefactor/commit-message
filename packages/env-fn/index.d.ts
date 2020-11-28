type Modes = 'special' | 'local'

export function envFn(mode?: Modes, cwd?: string): string[]