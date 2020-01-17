import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewComponent } from './pages/view/view.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherItemComponent } from './components/weather-item/weather-item.component';
import { FormsModule} from '@angular/forms'
import { PipesModule } from 'src/app/pipes/pipes.module'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewComponent,
    WeatherItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
