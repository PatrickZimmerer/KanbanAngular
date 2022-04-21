import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from 'src/models/task.class';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  task: Task = new Task();
  employeeList: string[] = [
    'Patrick Zimmerer',
    'Thomas Tausendpfund',
    'Manfred Wittl',
    'Maneder Libero',
    'Ibrahim Delfaco',
    'Rene Nachads',
  ];
  categoryList: string[] = [
    'Frontend Development',
    'UI/UX Design',
    'Marketing',
    'Backend Development',
  ];
  urgencyList: string[] = ['High', 'Medium', 'Low'];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public firestore: AngularFirestore
  ) {
    this.editTaskForm = this.formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      dueDate: new FormControl('', [Validators.required]),
      urgency: new FormControl('', [Validators.required]),
      assignedTo: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
    });
  }
  taskId: any;
  editTaskForm!: FormGroup;
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.taskId = paramMap.get('id');
      console.log('got id', this.taskId);
      this.getTask();
    });
  }

  getTask() {
    this.firestore
      .collection('tasks')
      .doc(this.taskId)
      .valueChanges()
      .subscribe((task: any) => {
        task.dueDate = new Date(task.dueDate);
        this.task = task;
        this.editTaskForm.setValue(this.task);
        console.log(this.editTaskForm.value);
      });
  }
  editBacklogTask() {
    if (this.editTaskForm.invalid) {
      this.editTaskForm.markAllAsTouched();
    } else {
      this.editTaskForm.value.dueDate =
        this.editTaskForm.value.dueDate.getTime();
      debugger;
      this.updateFirestore();
      this.router.navigate(['/backlog']);
    }
  }
  updateFirestore() {
    this.task = new Task(this.editTaskForm.value);
    this.firestore
      .collection('tasks')
      .doc(this.taskId)
      .update(this.task.toJSON())
      .then(() => {
        console.log('updated firebase');
      });
  }
}
