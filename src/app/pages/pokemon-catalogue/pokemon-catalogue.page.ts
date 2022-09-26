import { Pokemon } from './../../models/pokemon.model';
import { PokemonCatalogueService } from './../../services/pokemon-catalogue.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit {


  get pokemons(): Pokemon[]{
    return this.pokemonCatalogueService.pokemons;
  }

  get loading (): boolean{
    return this.pokemonCatalogueService.loading;
  }

  get error(): string {
    return this.pokemonCatalogueService.error;
  }

  constructor(private readonly pokemonCatalogueService:PokemonCatalogueService) { }

  ngOnInit(): void {
    this.pokemonCatalogueService.findAllPokemon();
  }

}
