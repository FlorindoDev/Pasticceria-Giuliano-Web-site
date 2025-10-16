import { TestBed } from '@angular/core/testing';

import { AssortimentoService } from './assortimento.service';

describe('ssortimento', () => {
  let service: AssortimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssortimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});