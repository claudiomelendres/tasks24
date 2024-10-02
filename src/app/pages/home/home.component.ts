import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from './../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'llenar formularios',
      completed: false,
    },

  ]);

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ],

  });

  changeHandler() {
    if (this.newTaskCtrl.valid && this.newTaskCtrl.value.trim()!=='') {
      const newTitle = this.newTaskCtrl.value.trim();
      this.addTask(newTitle);
      this.newTaskCtrl.reset();
    }
  }

  addTask(title: string){
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
    console.log(this.tasks());
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task,position)=> position !== index));
  }

  updateTask(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task
      })
    })
  }

  updateTaskEditingMode(index: number)
  {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === index) {
          return {
            ...task,
            editing: true
          }
        }
      return {// solo se puede editar un elemento a la vez
        ...task,
        editing: false
      };
      })
    })
  }

  updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement;
    const newTitle = input.value.trim();
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === index) {
          return {
            ...task,
            title: newTitle,
            editing: false
          }
        }
        return task
      })
    })
  }

}
