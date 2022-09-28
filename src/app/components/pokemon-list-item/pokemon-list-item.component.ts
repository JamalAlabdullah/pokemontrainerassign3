import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {

  ngOnInit(): void {
  }

  @Input() pokemon?: Pokemon; 
  @Input() index?: number; 

  private _toggle: boolean = false;
  
  constructor() { 
    console.log("under construction...");
    
  }
  
  get toggle(): boolean {
    console.log(this._toggle);
    return this._toggle;
  }

  set toggle(bool: boolean) {
    this._toggle = bool;
  }

  public toggleDetails() {
    console.log(!this._toggle);
    this._toggle = !this._toggle;
  }
}
