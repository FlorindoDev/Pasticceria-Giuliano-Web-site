import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItem } from './cart-item.component';

describe('CartItem', () => {
  let component: CartItem;
  let fixture: ComponentFixture<CartItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItem]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CartItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
