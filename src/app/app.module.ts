import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewComponent } from './pages/view/view.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherItemComponent } from './components/weather-item/weather-item.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { PipesModule } from 'src/app/pipes/pipes.module'
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { AuthenticateGuard } from './guards/authenticate.guard';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ViewComponent,
		WeatherItemComponent,
		LoginFormComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		PipesModule,
		ReactiveFormsModule,
	],
	providers: [AuthenticateGuard],
	bootstrap: [AppComponent]
})
export class AppModule { }
