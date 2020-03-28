import { NgModule } from '@angular/core';
import { GridComponent } from './grid/grid.component';
import { CellComponent } from './cell/cell.component';
import { SubGridComponent } from './sub-grid/sub-grid.component';

@NgModule({
  declarations: [CellComponent, GridComponent, SubGridComponent],
  imports: [],
  exports: [CellComponent, GridComponent, SubGridComponent]
})
export class GridFnModule { }
