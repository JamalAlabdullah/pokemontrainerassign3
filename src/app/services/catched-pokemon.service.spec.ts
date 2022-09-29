import { TestBed } from '@angular/core/testing';

import { CatchedPokemonService } from './catched-pokemon.service';

describe('CatchedPokemonService', () => {
  let service: CatchedPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatchedPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
