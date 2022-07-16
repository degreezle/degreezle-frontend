import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PuzzlePageComponent } from './puzzle-page/puzzle-page.component';

const routes: Routes = [
  { path: 'solution/:token', component: PuzzlePageComponent },
  { path: '', component: PuzzlePageComponent, pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
