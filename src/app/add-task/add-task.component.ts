import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
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
    public firestore: AngularFirestore,
    private el: ElementRef
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
        Validators.maxLength(300),
      ]),
      dueDate: new FormControl('', [Validators.required]),
      urgency: new FormControl('', [Validators.required]),
      assignedTo: new FormControl('', [Validators.required]),
    });
  }

  addTaskForm!: FormGroup;

  ngOnInit(): void {}

  resetForm() {
    this.addTaskForm.reset();
    this.addTaskForm.markAsUntouched();
    this.addTaskForm.markAsPristine();
  }

  /**
   * creates a new Task and updates it in the backend if the Form is valid
   * otherwise it scrolls to the first invalid inputfield
   */
  addTask() {
    if (this.addTaskForm.invalid) {
      this.addTaskForm.markAllAsTouched();
      this.scrollToFirstInvalidControl();
    } else {
      this.addTaskForm.value.dueDate = this.addTaskForm.value.dueDate.getTime();
      this.addTaskForm.value.location = 'Backlog';
      this.task = new Task(this.addTaskForm.value);
      this.firestore
        .collection('tasks')
        .add(this.task.toJSON())
        .then((result: any) => {
          console.log('added Task', result);
        });
      this.resetForm();
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
}
