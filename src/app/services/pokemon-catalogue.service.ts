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

  public findAllPokemon():void {
    this._loading= true;
    this.http.get<Pokemon[]>(apiPokemons)
    .pipe(
      finalize(() => {
        this._loading= false;
      })
    )
    .subscribe({
      next: (pokemons: Pokemon[]) => {
        this._pokemons=pokemons;
        console.log(pokemons);
      },
      error: (error: HttpErrorResponse) => {
        this._error= error.message;

      }
    })

  }
}
