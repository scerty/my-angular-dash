import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss', './sec.css'],
})
export class NavComponent implements OnInit {
  constructor(private dataSharingService: NavService,
    private authService: AuthService,
    private router: Router

    ) {}

  showOptions: boolean = false;
  showUserName: boolean = false;

  avatar='';
  

  ngOnInit() {

    this.authService.user().subscribe(
      (res: any) => {
       
        this.avatar=res.avatar
       
      

      }
    );
    this.showOptions = false; // Initialize showOptions when the component is loaded.




  }

  


  toggleSettings() {
    this.dataSharingService.updateShowContent(true);
    this.dataSharingService.updateShowProfile(false);


  }

  toggleMessages() {
    this.dataSharingService.updateShowContent(true);

  }
  toggleNotefications() {
    this.dataSharingService.updateShowContent(true);

  }
  toggleProfile() {
    this.dataSharingService.updateShowContent(true);
    this.dataSharingService.updateShowProfile(true);

  }
  logout() {
    this.authService.logout().subscribe(() => {
      this.authService.removeAccessToken();
      this.router.navigate(['/login']);

       // استخدم الدالة removeAccessToken() بدلاً من تعيين قيمة فارغة
    });
  }

}
