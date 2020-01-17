import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';



@NgModule({
  declarations: [HomeComponent, ViewComponent],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
