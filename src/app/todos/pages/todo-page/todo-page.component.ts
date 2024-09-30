import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Todo } from '../../interfaces/todo.interface';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {

  public todo?: Todo;

  constructor( 
    private todoService: TodosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

   }
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.todoService.getTodoById(id))
      ).subscribe(todo => {
        if ( !todo ) return this.router.navigate(['/todos/list']);
        this.todo = todo;
        console.log({todo});
        return;
      });
  }

}
