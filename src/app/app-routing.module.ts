import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OurDataPageComponent } from './our-data-page/our-data-page.component';
import { PuzzlePageComponent } from './puzzle-page/puzzle-page.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  { path: 'our-data', component: OurDataPageComponent }, 
  { path: 'solution/:token', component: PuzzlePageComponent },
  { path: 'archive/:puzzleId', component: PuzzlePageComponent },
  { path: ':puzzleId', component: RedirectComponent}, 
  { path: '', component: PuzzlePageComponent, pathMatch: 'full' }, 
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
