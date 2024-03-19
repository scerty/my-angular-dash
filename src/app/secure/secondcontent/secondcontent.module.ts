import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondcontentComponent } from './secondcontent.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountsettingsComponent } from './accountsettings/accountsettings.component';
import { MessegesComponent } from './messeges/messeges.component';
import { NoteficationsComponent } from './notefications/notefications.component';

@NgModule({
  declarations: [SecondcontentComponent, ProfileComponent, AccountsettingsComponent, MessegesComponent, NoteficationsComponent],
  imports: [CommonModule],
})
export class SecondcontentModule { }
