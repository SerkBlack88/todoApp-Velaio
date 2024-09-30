import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo.interface';
import { MaterialModule } from 'src/app/material/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'todo-card',
  imports: [ MaterialModule, CommonModule, RouterModule ],
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  
  @Input()
  public todo!: Todo;
  @Input()
  public index?: number;
  
  ngOnInit(): void {
    if ( !this.todo ) throw Error('Todo property is required');
  }

}
