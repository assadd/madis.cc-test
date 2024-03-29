import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/modules/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
