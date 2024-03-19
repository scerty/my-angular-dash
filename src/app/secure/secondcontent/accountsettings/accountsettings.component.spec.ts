import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsettingsComponent } from './accountsettings.component';

describe('AccountsettingsComponent', () => {
  let component: AccountsettingsComponent;
  let fixture: ComponentFixture<AccountsettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsettingsComponent]
    });
    fixture = TestBed.createComponent(AccountsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
