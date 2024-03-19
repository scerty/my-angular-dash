import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SocialUser,GoogleLoginProvider,SocialAuthService,FacebookLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string = '';
  passwordVisible: boolean = false; // Add the passwordVisible property

  user!: SocialUser;
  loggedIn!: boolean;

  validationUserMessage = {
    email: [
      { type: 'required', message: 'Please enter your Email' },
      { type: 'pattern', message: 'The entered Email is incorrect. Please try again' },
    ],
    password: [
      { type: 'required', message: 'Please enter your Password' },
      { type: 'minlength', message: 'The Password must be at least 8 characters or more. Please try again' },
    ]
  };

  loginForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  
   // private alertController: AlertController,
    private socialAuthService: SocialAuthService
  ) {}



  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    });

    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
  }


  submitForm() {
    const loginData = {
      email: this.loginForm.value.email.toLowerCase(), // Convert email to lowercase
      password: this.loginForm.value.password
    };

    this.authService.login(loginData).subscribe(
      (res: any) => {
        this.authService.setAccessToken(res.token);
        this.router.navigate(['/']);
      },
      (error) => {
        if (error.error && error.error.detail === 'unauthenticated') {
          this.errorMessage = 'Authentication failed. Please check your credentials and try again.';
        } else {
          this.errorMessage = error.message; // Set the error message
        }
        //this.presentErrorAlert(); // Display the error alert
        console.error(error);
      }
    );
  }

  goToSignupPage() {
    this.router.navigate(['/register']);
  }

}
