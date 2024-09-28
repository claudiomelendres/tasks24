import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from './../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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

  changeHandler(event: Event) {
    console.log('changeHandler');
    const input = event.target as HTMLInputElement;
    const newTitle = input.value;
    this.addTask(newTitle);
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

}
