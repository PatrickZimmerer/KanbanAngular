import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from 'src/models/task.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogDetailTaskComponent } from '../dialog-detail-task/dialog-detail-task.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent implements OnInit {
  task: any = new Task();
  allTasks: any = [];
  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}
  taskId: any;
  ngOnInit(): void {
    this.firestore
      .collection('tasks')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        console.log('received changes from DB', changes);
        this.allTasks = changes;
      });
  }
  openDetailDialog() {
    this.dialog.open(DialogDetailTaskComponent);
  }

  moveToBoard(task: any) {
    task.location = 'Todo';
    console.log(task);
    this.updateFirestore(task);
    console.log(task);
  }
  updateFirestore(task: any) {
    debugger;
    this.task = new Task(task);
    console.log('task is', task);
    console.log('this task is', this.task);
    this.firestore
      .collection('tasks')
      .doc(this.task.customIdName)
      .update(this.task.toJSON())
      .then(() => {
        console.log('updated firebase');
      });
  }

  trackByFn(task: any) {
    return this.taskId;
  }
}
