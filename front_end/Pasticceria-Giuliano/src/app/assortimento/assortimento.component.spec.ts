import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assortimento } from './assortimento.component';

describe('Assortimento', () => {
  let component: Assortimento;
  let fixture: ComponentFixture<Assortimento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Assortimento]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Assortimento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
