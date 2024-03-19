import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuplicComponent } from './puplic.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavModule } from './nav/nav.module';

import { ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    PuplicComponent,
    LoginComponent,
    RegisterComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NavModule
  ]
})
export class PuplicModule { }
