import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SweetPage } from './sweet-page.component';

describe('SweetPage', () => {
  let component: SweetPage;
  let fixture: ComponentFixture<SweetPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SweetPage]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SweetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
