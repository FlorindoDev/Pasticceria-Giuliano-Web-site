import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SweetSection } from './sweet-section.component';

describe('SweetSection', () => {
  let component: SweetSection;
  let fixture: ComponentFixture<SweetSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SweetSection]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SweetSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
