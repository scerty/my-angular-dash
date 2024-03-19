import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecureModule } from './secure/secure.module';
import { PuplicModule } from './puplic/puplic.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TesttsComponent } from './testts/testts.component'
import { NavService } from './services/nav.service'; // Import the NavService


import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthInterceptor } from './interceptors/auth.interceptor'; // Import your interceptor


import { SocialLoginModule, FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
//import { IonIntlTelInputModule } from 'ion-intl-tel-input';

@NgModule({
  declarations: [
    AppComponent,
    TesttsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SecureModule,
    PuplicModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    SocialLoginModule,
  
  ],
  providers: [NavService,
  
   


    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '391613021442-ob0p8c9u71c7i1c16cqjmmp8d3ktjhjo.apps.googleusercontent.com'


            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('783559696268926')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }


  
  
  
  
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
