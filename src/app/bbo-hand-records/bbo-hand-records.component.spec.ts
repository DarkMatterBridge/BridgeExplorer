import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BboHandRecordsComponent } from './bbo-hand-records.component';

describe('BboHandRecordsComponent', () => {
  let component: BboHandRecordsComponent;
  let fixture: ComponentFixture<BboHandRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BboHandRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BboHandRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
