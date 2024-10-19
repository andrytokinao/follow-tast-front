import { NgModule } from '@angular/core';
import {RouterModule, Routes,provideRouter,withComponentInputBinding} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {PrivateComponent} from "./private.component";
import {ProjectComponent} from "./project/project.component";
import {AdminComponent} from "./admins/admin.component";
import {ProfileComponent} from "./profile/profile.component";
import {AccessDeniedComponent} from "./access-denied/access-denied.component";
import {AuthGuard} from "../../services/authorization.service.ts";
import {ProjectResolverService} from "../../services/resolvers/project-resolver.service";
import {HomeComponent} from "./home/home.component";

const privateRoute: Routes = [
  {
    path: '',
    component: PrivateComponent,
        children: [
          { path: '', component: HomeComponent  },
          { path: 'profile', component: ProfileComponent  },
          { path: 'access-denied', component: AccessDeniedComponent },
          {
            path: 'project/:project',resolve:{project:ProjectResolverService},
            loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
            //  canMatch: [userProject]
          },
          {path: 'admin', component: AdminComponent  , canActivate :[AuthGuard]}, {
            path: 'admin',
            loadChildren: () => import('./admins/admin.module').then(m => m.AdminModule),
            //  canMatch: [userAdmin]
          },

        ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(privateRoute)],
  exports: [
    RouterModule]
})
export class PrivateRoutingModule {}
