const BASE_STABLE = `${process.env.HOME}/.config/Code/User`
const BASE_BETA = `${process.env.HOME}/.config/Code - Insiders/User`
const BASE = process.env.BETA === 'ON' ? BASE_BETA :BASE_STABLE

export const KEYBINDING = `${BASE}/keybindings.json`
export const SETTINGS = `${BASE}/settings.json`
export const JS_SNIPPETS = `${BASE}/snippets/javascript.json`
export const TS_SNIPPETS = `${BASE}/snippets/typescript.json`
export const TSX_SNIPPETS = `${BASE}/snippets/typescriptreact.json`
