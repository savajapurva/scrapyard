import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrdersDetailsComponent } from './all-orders-details.component';

describe('AllOrdersDetailsComponent', () => {
  let component: AllOrdersDetailsComponent;
  let fixture: ComponentFixture<AllOrdersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllOrdersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
