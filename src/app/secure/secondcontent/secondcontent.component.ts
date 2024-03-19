import { Component } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secondcontent',
  templateUrl: './secondcontent.component.html',
  styleUrls: ['./secondcontent.component.scss']
})
export class SecondcontentComponent {
  showProfile: boolean = false;
  message = '';
  avatar='';
  email=''

  //authenticated = false;
  constructor(private dataSharingService: NavService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.dataSharingService.showProfile$.subscribe((newValue) => {
      this.showProfile = newValue;


    });






    this.authService.user().subscribe(
      (res: any) => {
        this.message = `Mr. ${res.first_name} ${res.last_name}`;
        this.avatar=res.avatar;
        this.email=res.email
        //this.authenticated = true;
      

      })






  }




}
