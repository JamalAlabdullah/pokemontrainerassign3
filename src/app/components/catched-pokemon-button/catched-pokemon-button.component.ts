import { UserService } from './../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CatchedPokemonService } from './../../services/catched-pokemon.service';
import { Component,Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-catched-pokemon-button',
  templateUrl: './catched-pokemon-button.component.html',
  styleUrls: ['./catched-pokemon-button.component.css']
})
export class CatchedPokemonButtonComponent implements OnInit {


public isCatched:boolean = false;
@Input() pokemon?: Pokemon;

   get loading() : boolean{
    return this.catchedPokemonService.loading;
   }

  constructor (
    private userService: UserService,
    private readonly catchedPokemonService: CatchedPokemonService
  ) { }

  ngOnInit(): void {
    this.isCatched = this.userService.inFavourites(this.pokemon!.name)
  }


  onCatchedPokemonClick(): void {
    // add catched pokemon to trainer page 
    alert("you catched " + this.pokemon?.name)
    
    this.catchedPokemonService.addToTrainerPage(this.pokemon!.name)
    .subscribe({
      next: (user:User) => {
        this.isCatched = this.userService.inFavourites(this.pokemon!.name)
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR", error.message);
      }
    })
  }
  
  removeFromTrainerPage(){
    // remove pokemon from trainer page
    alert("you removed " + this.pokemon?.name)

    this.catchedPokemonService.removeFromTrainerPage(this.pokemon!.name)
    .subscribe({
      next: (user:User) => {
        this.isCatched=this.userService.inFavourites(this.pokemon!.name)
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR", error.message);
      }
    })
  }
}
