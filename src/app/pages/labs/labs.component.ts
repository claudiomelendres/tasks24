import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'bienvenido';
  todos = ['comprar pan', 'comprar leche', 'comprar huevos'];

  name = signal('Angular');
  age = 16;

  disabled = false;

  person = signal({
    name: 'jhon',
    lastName: 'Doe',
    age: 15
  });

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50,
    {
      nonNullable: true,
    }
  );
  nameCtrl = new FormControl(50, {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3),
    ],
  });

  constructor() {
    this.colorCtrl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }


  changeName() {
    // this.name = 'React';
    this.name.set('React')
  }

  changeHandler(event: Event) {
    console.log(event);
  }

  keyDownHandler(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
  }

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((state) => {
      return {
        ...state,
        age: parseInt(newValue,10)
      }
    });
  }

  changeNamePerson(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((state) => {
      return {
        ...state,
        name: newValue
      }
    });
  }


  tasks = signal(['iniciar sprint', 'compartir info', 'generar reportes']);

}
