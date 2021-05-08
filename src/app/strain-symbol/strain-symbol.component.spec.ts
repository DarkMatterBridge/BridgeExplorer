import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrainSymbolComponent } from './strain-symbol.component';

describe('StrainSymbolComponent', () => {
  let component: StrainSymbolComponent;
  let fixture: ComponentFixture<StrainSymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrainSymbolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrainSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
