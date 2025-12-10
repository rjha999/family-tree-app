import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageMembersComponent } from './components/manage-members/manage-members.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'manage', component: ManageMembersComponent },
  { path: '**', redirectTo: '' }
];
