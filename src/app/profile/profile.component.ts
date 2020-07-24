import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../services/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  errorMessage = '';

  constructor(private profile: ProfileService) { }

  ngOnInit() {
    this.profile.profile().subscribe(data => {
      console.log(data.data);
      this.currentUser = data.data;
    },
      error => {
        this.errorMessage = error.error.message;
      });
  }
}
