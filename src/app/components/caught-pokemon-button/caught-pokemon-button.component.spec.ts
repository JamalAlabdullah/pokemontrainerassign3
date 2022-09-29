import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaughtPokemonButtonComponent } from './caught-pokemon-button.component';

describe('CaughtPokemonButtonComponent', () => {
  let component: CaughtPokemonButtonComponent;
  let fixture: ComponentFixture<CaughtPokemonButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaughtPokemonButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaughtPokemonButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
