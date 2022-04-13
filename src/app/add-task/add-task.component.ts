import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  employeeList: string[] = [
    'Patrick Zimmerer',
    'Thomas Tausendpfund',
    'Manfred Wittl',
    'Maneder Libero',
    'Ibrahim Delfaco',
    'Rene Nachads',
  ];

  constructor(private formBuilder: FormBuilder) {
    this.addTaskForm.valueChanges.subscribe(console.log);
  }
  public addTaskForm: FormGroup = new FormGroup({
    title: new FormControl(
      '',
      [Validators.required, Validators.minLength(5)],
      []
    ),
    category: new FormControl('', [Validators.required], []),
    description: new FormControl(
      '',
      [Validators.required, Validators.minLength(10)],
      []
    ),
    dueDate: new FormControl('', [Validators.required], []),
    urgency: new FormControl('', [Validators.required], []),
    assignedTo: new FormControl('', [Validators.required], []),
  });

  ngOnInit(): void {}
}
