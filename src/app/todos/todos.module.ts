import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodosRoutingModule } from './todos-routing.module';

import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewTodoComponent } from './pages/new-todo/new-todo.component';
import { ListTodoPageComponent } from './pages/list-todo-page/list-todo-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    TodoPageComponent,
    LayoutPageComponent,
    NewTodoComponent,
    ListTodoPageComponent,
    SearchPageComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TodoCardComponent
  ]
})
export class TodosModule { }
