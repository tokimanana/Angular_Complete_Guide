import { Component, Input, SimpleChanges, OnChanges, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './tasks.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from './task/task.model';
import { EditTaskComponent } from './edit-task/edit-task.component';
@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, NewTaskComponent, CommonModule, FormsModule, EditTaskComponent],
})
export class TasksComponent implements OnInit, OnChanges{
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;
  isAddingTask = false;
  isEditingTask = false;
  searchTerm: string = '';
  sortOrder: string = 'asc';
  tasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.loadTasks();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId']) {
      this.loadTasks();
    }
  }

  loadTasks() {
    this.tasks = this.tasksService.getUserTasks(this.userId);
  }

  get filteredAndSortedTasks() {
    return this.tasks
      .filter(task => task.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
    this.loadTasks(); // Refresh tasks after adding
  }

  onEditTask(task: Task) {
    this.isEditingTask = true;
    this.selectedTask = task;
    console.log(this.selectedTask);
  }

  onCloseEditTask() {
    this.isEditingTask = false;
    this.loadTasks(); // Refresh tasks after editing
  }
}
