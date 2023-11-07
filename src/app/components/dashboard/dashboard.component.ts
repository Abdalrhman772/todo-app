import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  task: Task = new Task();
  tasksList: Task[] = [];
  taskValue: string = '';
  updatedTaskValue: string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.taskValue = '';
    this.updatedTaskValue = '';
    this.task = new Task();
    this.tasksList = [];
    this.getAllTasks();
  }

  getAllTasks() {
    this.crudService.getAllTasks().subscribe(
      (res) => {
        this.tasksList = res;
      },
      (err) => {
        alert('unable to get tasks list');
      }
    );
  }

  addTask() {
    this.task.taskName = this.taskValue;
    this.crudService.addTask(this.task).subscribe(
      (res) => {
        this.ngOnInit();
        this.taskValue = '';
      },
      (err) => {
        alert(err);
      }
    );
  }

  editTask() {
    this.task.taskName = this.updatedTaskValue;
    this.crudService.editTask(this.task).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Failed to update task please try again');
      }
    );
  }

  deleteTask(task: Task) {
    this.crudService.deleteTask(task).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('failed to delete task');
      }
    );
  }

  call(task: Task) {
    this.task = task;
    this.updatedTaskValue = task.taskName;
  }
}
