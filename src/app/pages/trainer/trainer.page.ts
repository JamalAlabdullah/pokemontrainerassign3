import { Pokemon } from './../../models/pokemon.model';
import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

  get user(): User | undefined {
    return this.useService.user;
  }

  get pokemons(): Pokemon[] {
    if (this.useService.user) {
      return this.useService.user.pokemon
    }

    return [];
  }

  constructor( private useService : UserService) { }

  ngOnInit(): void {
  }

}
