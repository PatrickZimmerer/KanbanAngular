import { Component, ElementRef, OnInit } from '@angular/core';
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
    private el: ElementRef,
    public firestore: AngularFirestore
  ) {
    this.editTaskForm = this.formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40),
      ]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(300),
      ]),
      dueDate: new FormControl('', [Validators.required]),
      urgency: new FormControl('', [Validators.required]),
      assignedTo: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
    });
  }
  taskId: any;
  editTaskForm!: FormGroup;

  /**
   * gets the task id based on the url on initialization
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.taskId = paramMap.get('id');
      console.log('got id', this.taskId);
      this.getTask();
    });
  }

  /**
   * gets the task values based on the id from the backend and fills the form with the given data
   */
  getTask() {
    this.firestore
      .collection('tasks')
      .doc(this.taskId)
      .valueChanges()
      .subscribe((task: any) => {
        task.dueDate = new Date(task.dueDate);
        this.task = task;
        this.editTaskForm.setValue(this.task);
      });
  }
  /**
   * updates the task in the backend if the Form is valid otherwise it scrolls
   * to the first invalid inputfield and then redirects you to the backlog
   */
  editBacklogTask() {
    if (this.editTaskForm.invalid) {
      this.editTaskForm.markAllAsTouched();
      this.scrollToFirstInvalidControl();
    } else {
      this.editTaskForm.value.dueDate =
        this.editTaskForm.value.dueDate.getTime();
      this.updateFirestore();
      this.router.navigate(['/backlog']);
    }
  }

  /**
   * scrolls to the first invalid inputfield (only executed if form is invalid)
   */
  scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement =
      this.el.nativeElement.querySelector('mat-form-field.ng-invalid');
    firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /**
   * transforms task to a JSON and updates its values in the backend
   */
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
