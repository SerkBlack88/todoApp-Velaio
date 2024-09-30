import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { minLengthArray, noDuplicateNames } from 'src/app/shared/validators/validators.functions';
import { v4 as uuidv4 } from 'uuid';
import { TodosService } from '../../services/todos.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent {

  public todoForm: FormGroup = this.fb.group({});

  public newAbility: string = '';
  public isSubmitted: boolean = false;

  constructor( 
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todosService: TodosService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  
  ) { }

  ngOnInit(): void {
    this.initTodoForm();
    if( this.router.url.includes('edit') ) {
      this.activatedRoute.params
        .pipe(
          switchMap( ({id}) => this.todosService.getTodoById( id ) )
        )
      .subscribe( todo => {
        console.log('todo!!', todo);
        if (!todo) return this.router.navigateByUrl('/');

        const deepCopiedTodo = structuredClone(todo);
        this.todoForm.patchValue({
          id: deepCopiedTodo.id,
          taskName: deepCopiedTodo.taskName,
          limitDate: deepCopiedTodo.limitDate,
          isCompleted: deepCopiedTodo.isCompleted
        });

        const personsInChargeControl = this.todoForm.get('personsInCharge') as FormArray;
        personsInChargeControl.clear();

        deepCopiedTodo.personsInCharge.forEach((person: any) => {
          personsInChargeControl.push(this.createPersonsInChargeFields(person));
        });

        console.log('hello', this.todoForm);
        return
      })
    }
  }

  initTodoForm(): void {
    this.todoForm = this.fb.group({
      id: [''],
      taskName: ['', [Validators.required, Validators.minLength(3)]],
      limitDate: ['', Validators.required],
      isCompleted: [false],
      personsInCharge: this.fb.array([], [minLengthArray(1), noDuplicateNames])
    });
  }

  get personsInCharge(): FormArray {
    return this.todoForm.get('personsInCharge') as FormArray;
  }

  createPersonsInChargeFields(person?: any): FormGroup {
    const abilitiesArray = this.fb.array([], this.minLengthArray(1));
    if (person && person.abilities) {
      person.abilities.forEach((ability: string) => {
        abilitiesArray.push(this.fb.control(ability, Validators.required));
      });
    }

    return this.fb.group({
      personName: [person?.personName || '', [Validators.required, Validators.minLength(5)]],
      age: [person?.age || '', [Validators.required, Validators.min(18)]],
      newAbility: [''],
      abilities: abilitiesArray
    });
  }

  addPerson(): void {
    this.personsInCharge.push(this.createPersonsInChargeFields());
  }

  removePerson(index: number): void {
    this.personsInCharge.removeAt(index);
  }

  addAbility(personIndex: number): void {

    const personGroup = this.personsInCharge.at(personIndex) as FormGroup;
    const newAbility = personGroup.get('newAbility')?.value;
    
    if (newAbility === '') return;

    const abilities = personGroup.get('abilities') as FormArray;
    if (abilities) {
      abilities.push(this.fb.control(newAbility, Validators.required));
    } else {
      console.error('abilities is null');
    }
    personGroup.get('newAbility')?.setValue('');
  }

  removeAbility(personIndex: number, abilityIndex: number): void {
    const abilities = this.personsInCharge.at(personIndex).get('abilities') as FormArray;
    if (abilities) {
      abilities.removeAt(abilityIndex);
    } else {
      console.error('abilities is null');
    }
  }

  getAbilitiesControls(): FormGroup[] {
    const abilities = this.personsInCharge.get('abilities') as FormArray;
    return abilities ? abilities.controls as FormGroup[] : [];
  }

  getAbilitiesField(form: any) {
    return form.controls.abilities.controls;
  }

  minLengthArray(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control instanceof FormArray) {
        return control.length >= min ? null : { minLengthArray: { valid: false, actualLength: control.length } };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.todoForm.invalid) {
      this.isSubmitted = true;
      this.todoForm.markAllAsTouched();
      return;
    }
    const formValue = this.todoForm.value;
    formValue.personsInCharge.forEach((person: any) => {
      delete person.newAbility;
    });

    if ( formValue.id ){
      this.todosService.updateTodo( formValue )
        .subscribe( todo => {
          console.log('updated', todo);
          this.showSnackbar(`La tarea ${todo.taskName} fue actualizada`)
      });

      return;
    }
    
    formValue.id = uuidv4();
    this.todosService.addTodo( formValue )
      .subscribe( todo => {
        this.router.navigate(['/todos/edit', todo.id])
        this.showSnackbar(`La tarea ${todo.taskName} fue creada`)
    })
  }

  onDeleteTask(): void {
    const formValue = this.todoForm.value;

    if ( !formValue.id) throw Error('Se requiere el id de la tarea');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.todoForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.todosService.deleteTaskById( formValue.id )),
        filter( (wasDeleted: boolean) => wasDeleted )
      )
      .subscribe( result => {
        this.router.navigate(['/todos']);
      })
  }

  showSnackbar( message: string ): void {
    this.snackbar.open( message, 'ok!', {
      duration: 2500
    });
  }

}
