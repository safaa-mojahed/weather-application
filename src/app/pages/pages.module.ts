import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { WeatherItemComponent } from '../components/weather-item/weather-item.component';
import { PipesModule} from 'src/app/pipes/pipes.module'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';



@NgModule({
  declarations: [HomeComponent, ViewComponent, WeatherItemComponent, LoginFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PipesModule
  ]
})
export class PagesModule { }
