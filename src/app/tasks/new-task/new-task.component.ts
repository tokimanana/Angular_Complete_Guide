import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { TasksService } from './../tasks.services';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
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
  taskForm: FormGroup;

  constructor (private fb: FormBuilder){
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      summary: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', [Validators.required, this.futurDateValidator]]
    })
  }

  futurDateValidator(control: AbstractControl): { [key: string] : boolean } | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    return selectedDate >= currentDate ? null : {'invalidDate': true}
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
