import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { last } from 'rxjs';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
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
    name: 'claudio',
    lastName: 'Doe',
    age: 30
  });

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


  tasks = signal(['iniciar sprint', 'compartir info', 'generar reportes']);

}
