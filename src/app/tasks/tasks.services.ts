import { NewTaskData, Task } from './task/task.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class TasksService {
  private tasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary: 'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
      completed: false,
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
      completed: false,
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary: 'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
      completed: false,
    },
    {
      id: 't4',
      userId: 'u2',
      title: 'Design logo',
      summary: 'Create a new logo for the company rebranding project',
      dueDate: '2024-07-20',
      completed: false,
    },
    {
      id: 't5',
      userId: 'u4',
      title: 'Write documentation',
      summary: 'Document the new API endpoints for the development team',
      dueDate: '2024-08-10',
      completed: false,
    },
    {
      id: 't6',
      userId: 'u5',
      title: 'Conduct user interviews',
      summary: 'Interview users to gather feedback on the new app features',
      dueDate: '2024-09-05',
      completed: false,
    },
    {
      id: 't7',
      userId: 'u6',
      title: 'Optimize database',
      summary: 'Improve database performance by optimizing queries and indexes',
      dueDate: '2024-10-15',
      completed: false,
    },
    {
      id: 't8',
      userId: 'u1',
      title: 'Update website content',
      summary: 'Refresh the website content to reflect the latest company news',
      dueDate: '2024-11-01',
      completed: false,
    },
    {
      id: 't9',
      userId: 'u2',
      title: 'Plan marketing campaign',
      summary: 'Develop a marketing strategy for the upcoming product launch',
      dueDate: '2024-12-10',
      completed: false,
    },
    {
      id: 't10',
      userId: 'u3',
      title: 'Fix bugs',
      summary: 'Resolve critical bugs reported by the QA team',
      dueDate: '2024-12-20',
      completed: false,
    },
  ];

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(taskData: NewTaskData, userId: string) {
    this.tasks.push({
      id: new Date().getTime().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
      completed: false,
    });
    this.saveTasks();
  }

  updateTask(updatedTask: Task) {
    // const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
    // if (taskIndex > -1) {
    //   this.tasks[taskIndex] = updatedTask;
    //   this.saveTasks();
    // }
    this.tasks = this.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
