import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;

  constructor(private userService: UserService) {
    this.userService.userSubjectObservable.subscribe((user: User)=> {
      this.user = user;
    })
  }

  ngOnInit(): void {
  }

}
