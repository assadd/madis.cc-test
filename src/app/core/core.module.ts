import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadService } from './services/load.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    LoadService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
