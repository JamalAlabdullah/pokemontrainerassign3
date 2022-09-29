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


//@Input() pokemonId:string="";


public isCatched:boolean= false;
@Input() pokemon?: Pokemon;

   get loading() : boolean{
    return this.catchedPokemonService.loading;
   }

  


  constructor(
    private userService: UserService,
    private readonly catchedPokemonService: CatchedPokemonService
  ) { }

  ngOnInit(): void {
    this.isCatched= this.userService.inFavourites(this.pokemon!.name)
  }


  onCatchedPokemonClick(): void {
    // add catched pokemon to trainer page 
    alert("you catched  " + this.pokemon)
    this.catchedPokemonService.addToTranerPage(this.pokemon!.name)
    .subscribe({
      next:(user:User) => {
        this.isCatched=this.userService.inFavourites(this.pokemon!.name)
        
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR", error.message);
      }
    })
  }
  

  removeFromTrainerPage(){
    // remove pokemon from trainer page
    console.log("works");
    
  }

}
