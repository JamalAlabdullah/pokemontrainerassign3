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

    if (this._pokemons?.length != 0 || this.loading) {
      return ;
    }





    if (StorageUtil.storageRead<Pokemon[]>(StorageKeys.PokemonList) === undefined) {
      this._loading= true;
      this.http.get<Pokemon[]>(`${apiPokemons}?offset=0&limit=151`)
        .pipe(
          finalize(() => {
            this._loading= false;
          })
        )
          .toPromise()
            .then(response => JSON.parse(JSON.stringify(response)).results)
              .then((response) => StorageUtil.storageSave<Pokemon[]>(StorageKeys.PokemonList, response!))
    }
    else {
      this._pokemons = StorageUtil.storageRead<Pokemon[]>(StorageKeys.PokemonList)
    }
  }



 

public pokemonByName(name:string) : Pokemon | undefined{

    return this._pokemons?.find((pokemon: Pokemon) => pokemon.name===name );
   }


 
 

   




}
