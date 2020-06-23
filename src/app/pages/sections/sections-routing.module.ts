import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SectionsPage } from './sections.page';

const routes: Routes = [
  {
    path: "sections",
    component: SectionsPage,
    children: [
      {
        path: "home",
        loadChildren: () => import("@pages/home/home-routing.module").then(m => m.HomePageRoutingModule)
      },
      {
        path: "favorites",
        loadChildren: () => import("@pages/favorites/favorites-routing.module").then(m => m.FavoritesPageRoutingModule)
      },
      {
        path: "auth",
        loadChildren: () => import("@pages/auth/auth-routing.module").then(m => m.AuthPageRoutingModule)
      },
      {
        path: "profile",
        loadChildren: () => import("@pages/profile/profile-routing.module").then(m => m.ProfilePageRoutingModule)
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "sections/home"
      }
    ]
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "sections/home"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectionsPageRoutingModule { }
