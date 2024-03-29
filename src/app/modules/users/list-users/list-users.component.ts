import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { user } from '../models/user.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users: user[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10
  totalItems: number = 0;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.loadUsers();

  }
  loadUsers() {
    this.service.getUsers(this.currentPage).subscribe(response => {
      this.users = response.data;
      this.totalItems = response.total;
    })
  }
  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  handleSearchResult(result: any) {
    if (result) {
      this.users = [];
      Array.isArray(result) ? this.users.push(...result) : this.users.push(result);
      this.users.push(...result);
    } else {
      this.users = [];

    }
  }
}




