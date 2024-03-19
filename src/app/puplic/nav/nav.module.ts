import { NgModule } from '@angular/core';
import { NavComponent } from './nav.component';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [NavComponent],
  exports: [NavComponent],
  imports: [
    // Other imported modules
    MatIconModule,MatMenuModule,MatButtonModule
  ]
})
export class NavModule {}
