
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {map,Observable,of,switchMap} from 'rxjs';
import { User } from '../models/user.model';

const {apiTrainer, apiKey} = environment;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // adding dependency injectable
  constructor(private readonly http:HttpClient) { }

  //- Module, HttpClient, observables, and RxJs operators
  public login(username:string): Observable<User>{
    return this.checkUsername(username)
    .pipe(
      switchMap((user: User | undefined) => {
        if (user === undefined) {
          return this.createUser(username);
        }
        return of(user);
      })
    )

  }

  private checkUsername(username:string): Observable<User | undefined> {
      return this.http.get<User[]>(`${apiTrainer}?username=${username}`)
      .pipe(
        map((response: User[]) => {
          return response.pop();
        })
      )
  }

	//- if not user - create a user 
  private createUser(username:string): Observable<User> {

    const user ={
      username,
      pokemon:[]
    };

    const headers = new HttpHeaders(
      {
        "Content-Type":"application/json",
        "x-api-key":apiKey
      }
    );

    return this.http.post<User>(apiTrainer, user, { headers })
  }
}
