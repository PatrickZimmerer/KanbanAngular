import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  employees = new FormControl();
  employeeList: string[] = [
    'Patrick Zimmerer',
    'Thomas Tausendpfund',
    'Manfred Wittl',
    'Maneder Libero',
    'Ibrahim Delfaco',
    'Renee Nachads',
  ];
  constructor() {}

  ngOnInit(): void {}
}
