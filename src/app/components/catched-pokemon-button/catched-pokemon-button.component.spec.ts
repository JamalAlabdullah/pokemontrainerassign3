import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchedPokemonButtonComponent } from './catched-pokemon-button.component';

describe('CatchedPokemonButtonComponent', () => {
  let component: CatchedPokemonButtonComponent;
  let fixture: ComponentFixture<CatchedPokemonButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatchedPokemonButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatchedPokemonButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
