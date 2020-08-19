import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinnacleReportComponent } from './binnacle-report.component';

describe('BinnacleReportComponent', () => {
  let component: BinnacleReportComponent;
  let fixture: ComponentFixture<BinnacleReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinnacleReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinnacleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
