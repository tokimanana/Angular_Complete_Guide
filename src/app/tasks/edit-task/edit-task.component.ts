import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { TasksService } from './../tasks.services';
import { CommonModule } from '@angular/common';
import { Task } from '../task/task.model';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) task!: Task;
  @Output() close = new EventEmitter();

  private TasksService = inject(TasksService);
  taskForm!: FormGroup;


  futurDateValidator(control: AbstractControl): { [key: string] : boolean } | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    return selectedDate >= currentDate ? null : {'invalidDate': true}
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: [this.task.title, [Validators.required, Validators.minLength(3)]],
      summary: [this.task.summary, [Validators.required, Validators.minLength(10)]],
      date: [this.task.dueDate, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Task saved:', this.task);
      this.close.emit();
    }
  }

  onCancel() {
    this.close.emit();
  }
}
