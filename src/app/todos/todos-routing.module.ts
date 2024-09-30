import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewTodoComponent } from './pages/new-todo/new-todo.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListTodoPageComponent } from './pages/list-todo-page/list-todo-page.component';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-todo', component: NewTodoComponent },
      { path: 'search', component: SearchPageComponent},
      { path: 'edit/:id', component: NewTodoComponent},
      { path: 'list', component: ListTodoPageComponent},
      { path: ':id', component: TodoPageComponent},
      { path: '**', redirectTo: 'list'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
