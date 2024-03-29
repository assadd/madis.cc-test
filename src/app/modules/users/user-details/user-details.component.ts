import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { user } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: user;
  constructor(private service: UserService, private _activatedRoute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.service.getUserById(params['id']).subscribe(data => {
        this.user = data;
      });
    });

  }
  goBack() {
    this.location.back();
  }
}
