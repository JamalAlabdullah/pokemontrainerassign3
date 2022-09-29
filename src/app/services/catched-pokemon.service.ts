import { Observable, finalize, tap } from 'rxjs';
import { Pokemon } from './../models/pokemon.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';


const {apiKey,apiTrainer} = environment;





@Injectable({
  providedIn: 'root'
})
export class CatchedPokemonService {

  private _loading: boolean = false;

  get loading(): boolean{
    return this._loading;
  }

  constructor(
    private http:HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly userService: UserService
  ) { }

  // get the catched pokemon

  // patch request with userId and name 

    public addToTranerPage(pokeName:string) : Observable<User>{
      if(!this.userService.user){
        throw new Error("there i no user")
      }
      const user: User = this.userService.user;
      const pokemon: Pokemon | undefined = this.pokemonService.pokemonByName(pokeName);
      if(!pokemon){ throw new Error("there is no pokemon with name: " + pokeName)}

      if(this.userService.inFavourites(pokeName)){
        throw new Error("the pokemon is already in trainer page")
      }

      const headers = new HttpHeaders({
        'content-type': 'application/json',
        'x-api-key': apiKey
      })

      this._loading=true;
     return  this.http.patch<User>(`${apiTrainer}/${user.id}`,{
        pokemon:[...user.pokemon, pokemon]
      }, {
        headers
      })
      .pipe(
        tap( (updatedUser:User) => {
          this.userService.user= updatedUser;

        }),
        finalize(() => {
          this._loading=false;
        })
      )
    } 
   



}
