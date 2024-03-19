import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteficationsComponent } from './notefications.component';

describe('NoteficationsComponent', () => {
  let component: NoteficationsComponent;
  let fixture: ComponentFixture<NoteficationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteficationsComponent]
    });
    fixture = TestBed.createComponent(NoteficationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
