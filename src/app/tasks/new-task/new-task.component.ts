import { TasksService } from './../tasks.service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type NewTaskData } from '../task/task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string;
  @Output() close = new EventEmitter();

  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';
  private TasksService = inject(TasksService);

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    this.TasksService.addTask(
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        date: this.enteredDate,
      },
      this.userId
    );
    this.close.emit();
  }
}
