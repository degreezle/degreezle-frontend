import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastMemberSelectorComponent } from './cast-member-selector.component';

describe('CastMemberSelectorComponent', () => {
  let component: CastMemberSelectorComponent;
  let fixture: ComponentFixture<CastMemberSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastMemberSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastMemberSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
