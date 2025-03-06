import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'followers/:username',
    loadComponent: () =>
      import('./followers-list/followers-list.component').then(
        (m) => m.FollowersListComponent
      ),
  },
  {
    path: 'user-detail/:username',
    loadComponent: () =>
      import('./user-detail/user-detail.component').then(
        (m) => m.UserDetailComponent
      ),
  },
  { path: '', component: HomeComponent }, 
  { path: '**', redirectTo: '/' }, 
];