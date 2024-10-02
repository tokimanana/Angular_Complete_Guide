import { Component, Input, Output, EventEmitter, inject } from '@angular/core';

import { type Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { DatePipe, CommonModule } from '@angular/common';
import { TasksService } from '../tasks.services';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  @Output() editTask = new EventEmitter();
  private tasksService = inject(TasksService);
  isEditing = false;
  

  onCompleteTask() {
    this.task.completed = true;
    this.tasksService.updateTask(this.task);
  }

  onEditTask() {
    this.tasksService.updateTask(this.task);
    this.isEditing = true;
    this.editTask.emit(this.task);
    console.log(this.task);
  }
}
