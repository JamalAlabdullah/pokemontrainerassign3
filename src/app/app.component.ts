import { PokemonCatalogueService } from './services/pokemon-catalogue.service';
import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  constructor(
    private readonly userService : UserService,
    private readonly pokemonService : PokemonCatalogueService
  ){}

  ngOnInit(): void {
      if(this.userService.user){
        this.pokemonService.findAllPokemon();

      }
  }
}
