import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorregisterComponent } from './vendorregister.component';

describe('VendorregisterComponent', () => {
  let component: VendorregisterComponent;
  let fixture: ComponentFixture<VendorregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
