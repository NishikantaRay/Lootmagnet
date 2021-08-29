import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdListComponent } from './ad-list/ad-list.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'admin', component: AdminComponent},
  {path: 'weekly-deals', component: AdListComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
