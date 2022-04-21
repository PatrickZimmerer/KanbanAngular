import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Task } from 'src/models/task.class';
@Component({
  selector: 'app-dialog-detail-task',
  templateUrl: './dialog-detail-task.component.html',
  styleUrls: ['./dialog-detail-task.component.scss'],
})
export class DialogDetailTaskComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public firestore: AngularFirestore
  ) {}
  task: any = {};
  taskId: any = '';
  ngOnInit(): void {
    console.log(this.data);
    this.task = this.data;
  }
}
