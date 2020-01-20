import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { ViewComponent } from './pages/view/view.component';


const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'home/:id/:day',
		component: ViewComponent
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
