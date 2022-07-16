import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastMemberDisplayComponent } from './cast-member-display.component';

describe('CastMemberDisplayComponent', () => {
  let component: CastMemberDisplayComponent;
  let fixture: ComponentFixture<CastMemberDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastMemberDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastMemberDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
