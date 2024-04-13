import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  constructor() { }

  controls: any = [];

  ngOnInit(): void {
    this.controls = [
      {
        controlType: 'input',
        order: 1,
        key: 'formName',
        validation: ['require'],
        label:'Form Name'
      },
      {
        controlType: 'checkbox',
        order: 2,
        key: 'controls',
        label:'Form Name'
      },
    ]
  }

}
