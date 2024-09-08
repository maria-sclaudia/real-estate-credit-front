import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './domain/features';
import { RegisterFormComponent } from './domain/ui/form';
import { ProfileSearchComponent } from './domain/ui/profile-search';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'register-form', component: RegisterFormComponent },
  { path: 'profile-search', component: ProfileSearchComponent },
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
