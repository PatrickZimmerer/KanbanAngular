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
    this.route.paramMap.subscribe((paramMap) => {
      this.taskId = paramMap.get('id');
      console.log('got id', this.taskId);
    });
  }
}
