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
  task: any = new Task();
  allTasks: any = [];
  taskId = '';

  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  /**
   * Gets the data from the backend and pushes it into allTasks array
   */
  ngOnInit(): void {
    this.firestore
      .collection('tasks')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        console.log('received changes from DB', changes);
        this.allTasks = changes;
      });
  }
  /**
   * Opens up a Dialog with all data of the clicked task
   * @param task the values of the clicked task
   */
  openDetailDialog(task: any) {
    this.task = new Task(task);
    this.dialog.open(DialogDetailTaskComponent, {
      width: '70%',
      maxWidth: '85%',
      minHeight: '40%',
      maxHeight: '80%',
      autoFocus: false,
      hasBackdrop: true,
      data: task,
    });
  }

  event: any;
  drop(event: CdkDragDrop<Task[]>) {
    console.log(event);

    if (event.previousContainer === event.container) {
      console.log('rearranged', event);
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log('moved to other container', event);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
