import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCard } from './order-card.component';

describe('OrderCard', () => {
  let component: OrderCard;
  let fixture: ComponentFixture<OrderCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrderCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
