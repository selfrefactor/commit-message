import {save} from '../../../package-storage/'

export function saveWorkInProgress(commitMessageValue: string): void {
  save('commitMessage', 'workInProgress', commitMessageValue, true)
}
