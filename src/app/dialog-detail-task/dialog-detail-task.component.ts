import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/models/task.class';
@Component({
  selector: 'app-dialog-detail-task',
  templateUrl: './dialog-detail-task.component.html',
  styleUrls: ['./dialog-detail-task.component.scss'],
})
export class DialogDetailTaskComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public firestore: AngularFirestore
  ) {}
  task: any = {};
  taskId: any = '';
  ngOnInit(): void {
    this.firestore
      .collection('tasks')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        console.log('received changes from DB', changes);
      });
  }
}
