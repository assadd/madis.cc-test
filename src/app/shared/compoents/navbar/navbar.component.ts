import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { user } from 'src/app/modules/users/models/user.model';
import { UserService } from 'src/app/modules/users/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input('displaySearch') displaySearch = false;
  searchQuery = new FormControl('');
  @Output() searchResult = new EventEmitter<any>();
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) {

  }
  ngOnInit() {
    this.search();
  }
  search() {
    this.searchQuery.valueChanges.pipe(
      debounceTime(300),
      switchMap(userId =>
        this.userService.getUserById(userId).pipe(
          catchError(() => {
            this.searchResult.emit(null);
            return of(null)
          })
        )
      )
    ).subscribe(
      (user: any) => {
        console.log(user)
        this.searchResult.emit(user);
      }
    ).add(
      // Add takeUntil outside of valueChanges pipe
      takeUntil(this.destroy$)
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

