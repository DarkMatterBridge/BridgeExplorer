import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdTricksComponent } from './dd-tricks.component';

describe('DdTricksComponent', () => {
  let component: DdTricksComponent;
  let fixture: ComponentFixture<DdTricksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdTricksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdTricksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
