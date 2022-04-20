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
// import { DragulaService } from 'ng2-dragula';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  task: any = new Task();
  allTasks: any = [];
  taskId = '';
  todo: any = [];
  progress: any = [];
  testing: any = [];
  done: any = [];

  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private route: ActivatedRoute // private dragulaService: DragulaService
  ) {
    // dragulaService.createGroup('tasks', {
    //   removeOnSpill: false,
    // });
    // this.subs.add(
    // this.dragulaService.drag('tasks').subscribe(({ name, el, source }) => {
    //   console.log(name, el, source);
    // })
    // );
    // this.subs.add(
    // this.dragulaService
    //   .drop('tasks')
    //   .subscribe(({ name, el, target, source, sibling }) => {
    //     console.log(name, el, source)
    //   })
    // );
  }

  ngOnInit(): void {
    this.firestore
      .collection('tasks')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        console.log('received changes from DB', changes);
        this.allTasks = changes;
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

  openDetailDialog() {
    this.dialog.open(DialogDetailTaskComponent);
  }
}
