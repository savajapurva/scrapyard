import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorforgotpasswordComponent } from './vendorforgotpassword.component';

describe('VendorforgotpasswordComponent', () => {
  let component: VendorforgotpasswordComponent;
  let fixture: ComponentFixture<VendorforgotpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorforgotpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorforgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
