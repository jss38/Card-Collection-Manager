import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Deck } from '../model/deck';
import { UserDeck } from '../model/user-deck';
import { User } from '../model/user';

@Injectable({
	providedIn: 'root'
})

export class StorageApiService 
{
	private url = environment.serverAPI;

	constructor( private http: HttpClient ) { }


	/********** deck api **********/ 


	// retrieve a deck; return deck
	public getDeck( id: string ): Observable<Deck>
	{
		return this.http.get<Deck>( this.url + 'deck/' + id );
	}

	// add a new deck; return the new deck
	public addDeck( deck: Deck ): Observable<Deck>
	{
		return this.http.post<Deck>( this.url + 'deck', deck );
	}

	// update a deck; return deck before update
	public updateDeck( deck: Deck ): Observable<Deck>
	{
		return this.http.put<Deck>( this.url + 'deck', deck );
	}

	// delete a deck; return the deck deleted
	public deleteDeck( id: string ): Observable<Deck>
	{
		return this.http.delete<Deck>( this.url + 'deck/' + id );
	}


	/********** user deck api **********/ 


	// retrieve an user deck; return user deck
	public getUserDeck( id: string ): Observable<UserDeck>
	{
		return this.http.get<UserDeck>( this.url + 'userDeck/' + id );
	}

	// add a new user deck; return the new user deck
	public addUserDeck( userDeck: UserDeck, deck?: Deck ): Observable<UserDeck>
	{
		if( deck )
		{
			return this.http.post<UserDeck>( this.url + 'userDeck', [ userDeck, deck ] );
		}
		else
		{	
			return this.http.post<UserDeck>( this.url + 'userDeck', [ userDeck ] );
		}
	}

	// update an user deck; return user deck before update
	public updateUserDeck( userDeck: UserDeck ): Observable<UserDeck>
	{
		return this.http.put<UserDeck>( this.url + 'userDeck', userDeck );
	}

	// delete an user deck; return the user deck deleted
	public deleteUserDeck( id: string ): Observable<UserDeck>
	{
		return this.http.delete<UserDeck>( this.url + 'userDeck/' + id );
	}


	/********** user api **********/ 


	//// retrieve a user; return user
	//public getUser( id: string ): Observable<User>
	//{
		//return this.http.get<User>( this.url + 'user/' + id );
	//}

	// add a new user; return the new user
	public addUser( user: User ): Observable<User>
	{
		return this.http.post<User>( this.url + 'user', user );
	}

	//// update a user; return user before update
	//public updateUser( user: User ): Observable<User>
	//{
		//return this.http.put<User>( this.url + 'user', user );
	//}

	//// delete a user; return the user deleted
	//public deleteUser( id: string ): Observable<User>
	//{
		//return this.http.delete<User>( this.url + 'user/' + id );
	//}
	
	// retrieve all decks of a user; return [ UserDeck[], Deck[] ]
	public getAllDecks(): Observable<[ UserDeck[], Deck[] ]>
	{
		return this.http.get<[ UserDeck[], Deck[] ]>( this.url + 'user/allDecks' );
	}
	

	/********** image api **********/ 


	// retrieve an image; return image in blob
	public getImage( id: string ): Observable<Blob>
	{
		return this.http.get( this.url + 'image/' + id, { responseType: 'blob' } );
	}
}
