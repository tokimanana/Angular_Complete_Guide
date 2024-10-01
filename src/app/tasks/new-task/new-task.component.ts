import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TasksService } from './../tasks.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string;
  @Output() close = new EventEmitter();

  taskForm: FormGroup;
  private TasksService = inject(TasksService);

  constructor (private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      summary: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', [Validators.required, this.futureDateValidator]],
    })
  }

  futureDateValidator(control: AbstractControl): { [key: string]: boolean} | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    return selectedDate > currentDate ? null : {'invalidDate' : true};
  }

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    if(this.taskForm.valid){
      this.TasksService.addTask(this.taskForm.value, this.userId);
    }
    this.close.emit();
  }
}
