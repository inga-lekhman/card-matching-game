import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { GamePageComponent } from "./pages/game/game-page.component";
import { StartPageComponent } from "./pages/start-page/start-page.component";

const routes: Routes = [
  {
    path: '',
    component: StartPageComponent,
  },
  {
    path: 'game',
    component: GamePageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
