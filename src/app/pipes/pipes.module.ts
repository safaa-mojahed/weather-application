import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitypipeComponent } from './citypipe/citypipe.component';
import { CityPipePipe } from './city-pipe.pipe';



@NgModule({
  declarations: [CitypipeComponent, CityPipePipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
