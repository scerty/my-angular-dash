// data-sharing.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NavService {
  private showContentSource = new BehaviorSubject<boolean>(false);    
  private showSettingsSource = new BehaviorSubject<boolean>(false);
  private showProfileSource = new BehaviorSubject<boolean>(false);
  private showMessagesSource = new BehaviorSubject<boolean>(false);
  private showNoteficationsSource = new BehaviorSubject<boolean>(false);


  showContent$ = this.showContentSource.asObservable();
  showSettings$ = this.showSettingsSource.asObservable();
  showProfile$ = this.showProfileSource.asObservable();
  showMessages$ = this.showMessagesSource.asObservable();
  showNotefications$ = this.showNoteficationsSource.asObservable();

  updateShowContent(newValue: boolean) {
    this.showContentSource.next(newValue);
  }
  updateShowSettings(newValue: boolean) {
    this.showContentSource.next(newValue);
  }
  updateShowProfile(newValue: boolean) {
    this.showProfileSource.next(newValue);
  }
  updateShowMessages(newValue: boolean) {
    this.showContentSource.next(newValue);
  }
  updateNotefications(newValue: boolean) {
    this.showContentSource.next(newValue);
  }





}
