import { Component } from '@angular/core';
import { delay, nextIndex } from 'rambdax';
import { ElectronService } from '../core/services';

function convertFiles(files: string[]){
  return files.map(x => `file://${x}`)
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  answered: boolean = false
  imageUrl: string
  i: number = 0
  tick: number = 150
  files: string[] = [] 
  canContinue: boolean = true

  constructor(public electronService: ElectronService) { }

   async start(){
    const files = await this.electronService.openDirectory()
    this.files = convertFiles(files)
    this.startLoop()  
   }
   async startLoop(){
    while(this.canContinue){
      this.imageUrl = this.files[this.i]
      await delay(this.tick)
      this.i = nextIndex(this.i, this.files)
    }
   }
   togglePause(){
     this.canContinue = !this.canContinue
     if(this.canContinue) this.startLoop()
   }
   onRangeChange(x: string){
     this.tick = Number(x)
   }
   confirm(){
      this.answered = true
      this.start()
   }
}
