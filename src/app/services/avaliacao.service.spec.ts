import { TestBed } from '@angular/core/testing';

import { AvaliacaoService } from './avaliacao.service';

describe('AvaliacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvaliacaoService = TestBed.get(AvaliacaoService);
    expect(service).toBeTruthy();
  });
});
