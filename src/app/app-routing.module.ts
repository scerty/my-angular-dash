import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureComponent } from './secure/secure.component';
import { PuplicComponent } from './puplic/puplic.component';
import { LoginComponent } from './puplic/login/login.component';
import { RegisterComponent } from './puplic/register/register.component';

const routes: Routes = [
{path:'',component:SecureComponent},

{path:'',component:PuplicComponent,
children:[
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent}

]

}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
