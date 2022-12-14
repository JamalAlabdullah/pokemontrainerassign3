import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { finalize } from 'rxjs';
import { StorageUtil } from '../utils/storage.util';
import { StorageKeys } from '../enums/storage-keys.enum';


const { apiPokemons } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemons?: Pokemon[] = [];
  private _error:string = "";
  private _loading : boolean= false;

  constructor(private readonly http:HttpClient) {
    // initialize pokemons
    this.findAllPokemon();
  }

  get pokemons(): Pokemon[] | undefined {
      return StorageUtil.storageRead<Pokemon[]>(StorageKeys.PokemonList);
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean{
    return this._loading;
  }

  public findAllPokemon(): void {

    if (StorageUtil.storageRead<Pokemon[]>(StorageKeys.PokemonList) === undefined) {
      this._loading = true;
      this.http.get<Pokemon[]>(`${apiPokemons}?offset=0&limit=151`)
        .pipe(
          finalize(() => {
            this._loading = false;
          })
        )
        .subscribe({
          next: (pokemons: Object) => {
            let { results } = Object(pokemons);
            for (let i = 0; i < results.length; i++) {
              let pokemon = results[i];
              const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`
              pokemon.imgUrl = imgUrl;
              pokemon.id = i + 1;
              this._pokemons?.push(pokemon);
              StorageUtil.storageSave<Pokemon[]>(StorageKeys.PokemonList, this._pokemons!)
            }
          },
          error: () => {}
        })
    }
    else {
      this._pokemons = StorageUtil.storageRead<Pokemon[]>(StorageKeys.PokemonList)
    }
  }

  public pokemonByName(name:string) : Pokemon | undefined{
    return this._pokemons?.find((pokemon: Pokemon) => pokemon.name === name);
  }
}