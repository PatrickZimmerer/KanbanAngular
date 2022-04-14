import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { getApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Task } from 'src/models/task.class';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  task = new Task();
  // dueDate: Date;
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
    private formBuilder: FormBuilder,
    public firestore: AngularFirestore
  ) {
    this.addTaskForm = this.formBuilder.group({
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
      board: new FormControl('', [Validators.required], []),
      location: new FormControl('', [Validators.required], []),
    });
  }

  addTaskForm!: FormGroup;

  ngOnInit(): void {}

  addTask() {
    if (this.addTaskForm.invalid) {
      this.addTaskForm.markAllAsTouched();
    } else {
      console.log('reset');
      this.addTaskForm.reset();
      this.addTaskForm.markAsUntouched();
      this.addTaskForm.markAsPristine();
      console.log('before timestamp and location', this.addTaskForm.value);
      this.addTaskForm.value.dueDate = this.addTaskForm.value.dueDate.getTime();
      this.addTaskForm.value.location = 'Backlog';
      // const firebaseApp = getApp();
      // const db = getFirestore(firebaseApp);
      // const taskCollection = collection(db, 'tasks');
      // addDoc(taskCollection, this.addTaskForm.value);
      this.task = new Task(this.addTaskForm.value);
      console.log('this.task is', this.task);
      this.firestore
        .collection('tasks')
        .add(this.task.toJSON())
        .then((result: any) => {
          console.log('added Task', result);
        });
    }
  }
}
