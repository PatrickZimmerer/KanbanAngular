import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from 'src/models/task.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogDetailTaskComponent } from '../dialog-detail-task/dialog-detail-task.component';
@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent implements OnInit {
  task: any = new Task();
  allTasks: any = [];
  constructor(private firestore: AngularFirestore, public dialog: MatDialog) {}
  taskId: any;

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

  /**
   * Changes the location of the task and updates the backend
   * @param task contains the values of the clicked task
   */
  moveToBoard(task: any) {
    task.location = 'Todo';
    this.updateFirestore(task);
  }

  /**
   * transforms task to a JSON and updates its values in the backend
   * @param task contains the value of the given task
   */
  updateFirestore(task: any) {
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

  /**
   * This is a helper function that checks when a task based on its id is added and only
   * renders the new task instead of allTasks ( for scalability )
   * @param task values of task
   * @returns the id of each task in the for loop
   */
  trackByFn(task: any) {
    return this.taskId;
  }
}
