import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesttsComponent } from './testts.component';

describe('TesttsComponent', () => {
  let component: TesttsComponent;
  let fixture: ComponentFixture<TesttsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesttsComponent]
    });
    fixture = TestBed.createComponent(TesttsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
