import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss',],
 
})
export class MenuComponent {
  showSettingsPanel: boolean = false;
  showUserName: boolean = false;



  ngOnInit() {
    this.showSettingsPanel = false; // Initialize showOptions when the component is loaded.
  }

  OpenSettings() {
    this.showSettingsPanel = !this.showSettingsPanel;
    console.log(this.showSettingsPanel)
  }
}
