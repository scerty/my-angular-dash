import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import * as Filter from 'bad-words';

import { AuthService } from 'src/app/services/auth.service';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss','../puplic.component.scss'],
  
})
export class RegisterComponent  {
  showSuccessMessage: boolean = false;
  serverResponse: string = '';
  validationMessages = {
    first_name: [
      { type: 'required', message: 'Please enter your first name' },
      { type: 'pattern', message: 'First name is too short' },
      { type: 'profanity', message: 'First name contains profane or offensive language' },
    ],
    last_name: [
      { type: 'required', message: 'Please enter your last name' },
      { type: 'pattern', message: 'Last name is too short' },
      { type: 'profanity', message: 'Last name contains profane or offensive language' },
    ],
    email: [
      { type: 'required', message: 'Please enter your email' },
      { type: 'pattern', message: 'Invalid email. Please try again' },
    ],


 
    password: [
      { type: 'required', message: 'Please enter your password' },
      { type: 'pattern', message: 'Password must contain at least one uppercase letter, one lowercase letter, and one digit' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'forbiddenNames', message: 'Password should not contain your first name or last name' },
    ],
    password_confirm: [
      { type: 'required', message: 'Please enter password confirmation' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'passwordMismatch', message: 'Password and password confirmation do not match' },
    ],
  };
  
  signupForm!: FormGroup;
  filter: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.filter = new Filter();
  }


  ngOnInit() {



    this.signupForm = 
    
    this.formBuilder.group({
      first_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        this.profanityValidator.bind(this),
      ])),
      last_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        this.profanityValidator.bind(this),
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'),
      ])),
    
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+'),
      ])),
      password_confirm: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])),
    is_restaurantmanager:true
    }, {
      validators: this.passwordMatchValidator.bind(this),
    });
  }

  profanityValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    const isValid = !this.filter.isProfane(value);
    return isValid ? null : { profanity: true };
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('password_confirm')?.value;
    const firstName = control.get('firstname')?.value;
    const lastName = control.get('lastname')?.value;

    if (password !== confirmPassword) {
      control.get('password_confirm')?.setErrors({ passwordMismatch: true });
    }
    if (password) {if (password.includes(firstName) || password.includes(lastName)) {
      control.get('password')?.setErrors({ forbiddenNames: true });
    }}
    

    return null;
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  submitForm() {
    this.authService.rmRregister(this.signupForm.getRawValue()).subscribe(
      (response: any) => {
        // Registration successful
        this.showSuccessMessage = true;
        this.serverResponse = response.message;
        this.router.navigate(['/loginscreen']);
       // this.openDialog('Registration successful!', 'You have successfully registered. Please login to continue.');
      },
      (error:any) => {
        if (error.status === 400 && Array.isArray(error.error.email) && error.error.email.length > 0) {
          // Email already exists, allow user to try with a different email
          this.signupForm.get('email')?.reset();
          this.serverResponse = error.error.email[0];
        } else {
          // Handle other errors if needed
          console.error(error);
        }
      }
    );
  }
  
  openDialog(title: string, message: string) {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { title, message, showLoginButton: true }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === 'login') {
        this.goToLoginPage();
      }
    });
  }
  
}
