import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurDataPageComponent } from './our-data-page.component';

describe('OurDataPageComponent', () => {
  let component: OurDataPageComponent;
  let fixture: ComponentFixture<OurDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurDataPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
