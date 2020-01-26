import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { ViewComponent } from './pages/view/view.component';
import {AuthenticateGuard} from 'src/app/guards/authenticate.guard';

const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
		canActivate: [AuthenticateGuard]
	},
	{
		path: 'home/:id/:day',
		component: ViewComponent,
		canActivate: [AuthenticateGuard]
	},
	{
		path: '',
		component: LoginFormComponent
	},
	{
		path: 'login',
		component: LoginFormComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
