import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo } from '../../interfaces/todo.interface';
import { TodosService } from '../../services/todos.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {

  public searchInput = new FormControl();
  public todos: Todo[] = [];
  public selectedTodo: Todo | undefined;

  constructor( private todoService: TodosService) { }

  searchTodo() {
    const value: string = this.searchInput.value || '';

    this.todoService.getSuggestions(value)
      .subscribe(todos => this.todos = todos);
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {

    console.log('event', event);
    
    if( !event.option.value ) {
      this.selectedTodo = undefined;
      return;
    }

    const todo: Todo = event.option.value;
    this.searchInput.setValue( todo.taskName );

    this.selectedTodo = todo;
  }

}
