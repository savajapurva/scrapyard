import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorportalComponent } from './vendorportal.component';

describe('VendorportalComponent', () => {
  let component: VendorportalComponent;
  let fixture: ComponentFixture<VendorportalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorportalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
