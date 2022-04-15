import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from 'src/models/task.class';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent implements OnInit {
  task: any = new Task();
  allTasks: any = [];
  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.firestore
      .collection('tasks')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        console.log('received changes from DB', changes);
        this.allTasks = changes;
      });
  }
}
