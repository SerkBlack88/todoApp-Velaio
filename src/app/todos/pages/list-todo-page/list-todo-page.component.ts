import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo.interface';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-list-todo-page',
  templateUrl: './list-todo-page.component.html',
  styleUrls: ['./list-todo-page.component.scss']
})
export class ListTodoPageComponent implements OnInit {

  public todos: Todo[] = [];

  filteredTodos: Todo[] = [];
  selectedFilter = 'all';

  constructor( private todosService: TodosService ) { }
  ngOnInit(): void {
    this.todosService.getTodos()
      .subscribe(todos => {
        this.todos = todos
        this.filterTodos();
      });
  }

  filterTodos() {
    if (this.selectedFilter === 'all') {
      this.filteredTodos = this.todos;
    } else if (this.selectedFilter === 'completed') {
      this.filteredTodos = this.todos.filter(todo => todo.isCompleted);
    } else if (this.selectedFilter === 'pending') {
      this.filteredTodos = this.todos.filter(todo => !todo.isCompleted);
    }
  }

}
