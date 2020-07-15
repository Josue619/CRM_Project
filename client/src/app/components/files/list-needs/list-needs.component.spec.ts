import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNeedsComponent } from './list-needs.component';

describe('ListNeedsComponent', () => {
  let component: ListNeedsComponent;
  let fixture: ComponentFixture<ListNeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
