import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Todo } from '../interfaces/todo.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class TodosService {

    private baseUrl: string = environments.baseUrl;
    constructor(private http: HttpClient) { }

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${this.baseUrl}/todos`);
    }

    getTodoById(id: string): Observable<Todo | undefined> {
        return this.http.get<Todo>(`${this.baseUrl}/todos/${id}`)
            .pipe(
                catchError(() => {
                    console.error('Error getting todo by id');
                    return of(undefined);
                })
            )
    }

    getSuggestions( query: string ): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${this.baseUrl}/todos?q=${query}&_limit=6`);
    }

    addTodo( todo: Todo ): Observable<Todo> {
        return this.http.post<Todo>(`${this.baseUrl}/todos`, todo)
    }

    updateTodo( todo: Todo ): Observable<Todo> {
        if ( !todo.id ) throw Error('Hero id is required');
        return this.http.patch<Todo>(`${this.baseUrl}/todos/${ todo.id }`, todo)
    }

    deleteTaskById( id: string ): Observable<boolean> {

        return this.http.delete(`${this.baseUrl}/todos/${ id }`)
            .pipe(
                map( () => true ),
                catchError( err => of(false))
            )
    }
    
}