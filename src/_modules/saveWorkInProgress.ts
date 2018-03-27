import { save } from 'package-storage'

export function saveWorkInProgress(commitMessageValue: string) {
  try{
    save('commitMessage', 'workInProgress', commitMessageValue)
  }catch(e){
    console.log(e.message);
  }
}
