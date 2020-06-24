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
        loadChildren: () => import("../home/home.module").then(m => m.HomePageModule)
      },
      {
        path: "favorites",
        loadChildren: () => import("../favorites/favorites.module").then(m => m.FavoritesPageModule)
      },
      {
        path: "auth",
        loadChildren: () => import("../auth/auth.module").then(m => m.AuthPageModule)
      },
      {
        path: "profile",
        loadChildren: () => import("../profile/profile.module").then(m => m.ProfilePageModule)
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
