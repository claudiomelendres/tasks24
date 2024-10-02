
import { Component, computed, signal, effect } from '@angular/core';
import { Task } from './../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([


  ]);

  filter = signal<'all'|'pending'|'completed'>('all');

  // deriva lo que es tasks
  taskByFilter = computed(() => {
    const tasks = this.tasks();
    const filter = this.filter();
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
   return tasks;
  });

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ],

  });

  constructor() {
    effect(() => {
      const tasks = this.tasks();
      console.log('run effect tasks:', tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }

  ngOnInit(): void {
    const tasksStorage = localStorage.getItem('tasks');
    if (tasksStorage) {
      this.tasks.set(JSON.parse(tasksStorage));
    }
  }


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

  changeFilter(filter: 'all'|'pending'|'completed'){
    this.filter.set(filter);
  }

}
