import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {
  showContent: boolean = false;
  message = '';
  avatar='';
  authenticated = false;

  constructor(private dataSharingService: NavService,
    private authService: AuthService,
    private router: Router

    ) {}

  ngOnInit() {
/*
    this.authService.user().subscribe(
      (res: any) => {
        this.message = `Hi ${res.first_name} ${res.last_name}`;
        this.avatar=res.avatar
        this.authenticated = true;
      

      },
      (err: any) => {
        this.authenticated = false;
        this.router.navigate(['/login']);
      }
    );


    this.dataSharingService.showContent$.subscribe((newValue) => {
      this.showContent = newValue;
    });*/
  }





  subContentClose() {
    this.dataSharingService.updateShowContent(false);
    this.dataSharingService.updateShowProfile(false);


  }
}
