import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from './models/user.model';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private cache = new Map<string, BehaviorSubject<any>>();
  constructor(private httpClient: HttpClient) { }
  getUsers(page) {
    let url = `${environment.API_ENDPOINT}users?page=${page}`;
    if (this.cache.has(url)) {
      return this.cache.get(url).asObservable()
    }
    else {
      const dataSubject = new BehaviorSubject<any>(null);
      this.cache.set(url, dataSubject);
      return this.httpClient.get<any>(url).pipe(
        tap(data => {
          dataSubject.next(data);
        })
      );
    }
  }
  getUserById(id: number) {
    return this.httpClient.get<user>(`${environment.API_ENDPOINT}users/${id}`).pipe(
      map((data: any) => data.data)
    );
  }
}


