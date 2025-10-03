import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Profile } from './profile/profile';
import { Logout } from './logout/logout';

const routes: Routes = [
  { path: 'profile', component: Profile },
  { path: 'logout', component: Logout },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
