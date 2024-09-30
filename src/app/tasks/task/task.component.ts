import { Component, EventEmitter, Input, Output } from '@angular/core';

import { type Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { DatePipe, CommonModule } from '@angular/common';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  @Output() complete = new EventEmitter<string>();

  onCompleteTask() {
    // this.complete.emit(this.task.id);

    console.log(this.task);
    this.task.completed = true;
    console.log("Class applied:", this.task.completed);
  }
}
