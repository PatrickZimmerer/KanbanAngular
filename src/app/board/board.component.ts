import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from 'src/models/task.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogDetailTaskComponent } from '../dialog-detail-task/dialog-detail-task.component';
import { ActivatedRoute } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  todo: any = [];
  progress: any = [];
  testing: any = [];
  done: any = [];
  doneList: any = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  task: any = new Task();
  allTasks: any = [];
  taskId = '';

  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

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
}
