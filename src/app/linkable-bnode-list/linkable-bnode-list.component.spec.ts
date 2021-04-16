import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkableBnodeListComponent } from './linkable-bnode-list.component';

describe('LinkableBnodeListComponent', () => {
  let component: LinkableBnodeListComponent;
  let fixture: ComponentFixture<LinkableBnodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkableBnodeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkableBnodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
