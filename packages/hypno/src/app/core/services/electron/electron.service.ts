import { Injectable } from '@angular/core';

import {dialog, ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { fdir } from 'fdir'
import { any } from 'rambdax';

const IMAGES = ['.jpg','.png', '.jpeg', '.webp']
const defaultFilterFn = x => x.endsWith('.js')
const defaultExcludeFn = x => x.includes('node_modules') || x.startsWith('.')

async function scanFolder({
  folder,
  filterFn = defaultFilterFn,
  excludeFn = defaultExcludeFn,
  maxDepth = 4,
}){
  if (!fs.existsSync(folder)){
    throw new Error(`${ folder } - folder path is wrong as it doesn't exist`)
  }

  const files = await new fdir()
    .withMaxDepth(maxDepth)
    .withFullPaths()
    .exclude(excludeFn)
    .filter(filterFn)
    .crawl(folder)
    .withPromise()

  return files
}


@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  dialog: typeof dialog;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  async openDirectory(){
    const [selectedDirectory] = await this.remote.dialog.showOpenDialogSync({ properties: [ 'openFile', 'openDirectory'], message: 'Open image directory' })
    const files = await scanFolder({
      folder: selectedDirectory,
      maxDepth: 2,
      filterFn: (filePath: string) =>any(x => filePath.endsWith(x), IMAGES)
    })
    return files as string[]
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.dialog = window.require('electron').dialog;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }
}
