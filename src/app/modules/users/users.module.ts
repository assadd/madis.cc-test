import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';

import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [ListUsersComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatCardModule,
    SharedModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [

  ]
})
export class UsersModule { }
