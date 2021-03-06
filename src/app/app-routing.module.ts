import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./pages/sections/sections.module").then(m => m.SectionsPageModule)
  },
  {
    path: 'add-pet',
    loadChildren: () => import('./pages/add-pet/add-pet.module').then( m => m.AddPetPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
