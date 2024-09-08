import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './domain/features';
import { RegisterFormComponent } from './domain/ui/form';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'register-form', component: RegisterFormComponent },
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
