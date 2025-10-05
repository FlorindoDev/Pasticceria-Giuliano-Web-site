import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SweetCard } from './sweet-card.component';

describe('SweetCard', () => {
  let component: SweetCard;
  let fixture: ComponentFixture<SweetCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SweetCard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SweetCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
