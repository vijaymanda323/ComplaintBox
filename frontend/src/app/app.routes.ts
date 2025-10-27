import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'submit',
    loadComponent: () => import('./components/submit-complaint/submit-complaint.component').then(m => m.SubmitComplaintComponent)
  },
  {
    path: 'track',
    loadComponent: () => import('./components/track-complaint/track-complaint.component').then(m => m.TrackComplaintComponent)
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./components/admin-login/admin-login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./components/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];


































