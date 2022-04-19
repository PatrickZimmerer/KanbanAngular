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
    this.route.paramMap.subscribe((paramMap) => {
      this.taskId = paramMap.get('id');
      console.log('got ids', this.taskId);
    });
    this.firestore
      .collection('tasks')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        console.log('received changes from DB', changes);
        this.allTasks = changes;
      });
  }
  openDetailDialog() {
    const dialog = this.dialog.open(DialogDetailTaskComponent);
    dialog.componentInstance.task = new Task(this.task.toJSON());
    dialog.componentInstance.taskId = this.taskId;
  }

  moveToBoard(task: any) {
    task.location = 'Board';
    console.log(task);
    task = new Task(task);
    console.log(task);
    this.firestore.collection('tasks').doc(task).update(task.toJSON());
  }
}
