import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OurDataPageComponent } from './our-data-page/our-data-page.component';
import { PuzzlePageComponent } from './puzzle-page/puzzle-page.component';

const routes: Routes = [
  { path: 'our-data', component: OurDataPageComponent }, 
  { path: 'solution/:token', component: PuzzlePageComponent },
  { path: ':puzzleId', component: PuzzlePageComponent },
  { path: '', component: PuzzlePageComponent, pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
