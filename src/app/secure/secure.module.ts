import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from './secure.component';
import { NavModule } from './nav/nav.module';
import { MenuModule } from './menu/menu.module';
import { MaincontentModule } from './maincontent/maincontent.module';

import { RightsidebarModule } from './rightsidebar/rightsidebar.module';
//import { MaincontentModule } from './maincontent/maincontent.component';
import { SecondcontentComponent } from './secondcontent/secondcontent.component'; // Import the SecondcontentModule


@NgModule({
  declarations: [
    SecureComponent,
  //  MaincontentComponent,
           SecondcontentComponent
 

  ],
  imports: [
    CommonModule,
    NavModule,
    MenuModule,
    RightsidebarModule,MaincontentModule,

    
  ]
})
export class SecureModule { }
