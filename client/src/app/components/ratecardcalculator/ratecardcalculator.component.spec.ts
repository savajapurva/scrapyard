import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatecardcalculatorComponent } from './ratecardcalculator.component';

describe('RatecardcalculatorComponent', () => {
  let component: RatecardcalculatorComponent;
  let fixture: ComponentFixture<RatecardcalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatecardcalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatecardcalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
