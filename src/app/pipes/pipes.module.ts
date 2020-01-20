import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityPipePipe } from 'src/app/pipes/city-pipe.pipe';



@NgModule({
	declarations: [ CityPipePipe ],
	imports: [
		CommonModule
	],
	exports:[CityPipePipe]
})
export class PipesModule { }
