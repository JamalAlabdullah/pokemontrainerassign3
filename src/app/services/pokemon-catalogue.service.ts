import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { finalize } from 'rxjs';



const {apiPokemons} = environment;


@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemons: Pokemon[] = [];
  private _error:string = "";
  private _loading : boolean= false;


  get pokemons(): Pokemon[]{
    return this._pokemons;
  }


    get error(): string {
      return this._error;
    }


    get loading(): boolean{
      return this._loading;
    }

  constructor(private readonly http:HttpClient) { }

  public findAllPokemon(): void {
    this._loading= true;
    this.http.get<Pokemon[]>(`${apiPokemons}?offset=0&limit=151`)
    .pipe(
      finalize(() => {
        this._loading= false;
      })
    )
    .toPromise()
    .then(response => JSON.parse(JSON.stringify(response)).results)
    .then(response => this._pokemons = response)
  }
}
