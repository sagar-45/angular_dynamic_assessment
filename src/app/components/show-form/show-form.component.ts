import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlBase } from 'src/app/interface/control-base';

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.scss']
})
export class ShowFormComponent implements OnInit {

  constructor() { }
  controls!: ControlBase[];
  form!: FormGroup;

  ngOnInit(): void {
    this.controls = [
      {
        controlType: 'label',
        order: 1,
        key: 'formName'
      },
      {
        controlType: 'input',
        order: 2,
        required: true,
        key: 'name'
      },
      {
        controlType: 'input',
        order: 3,
        required: true,
        key: 'lastName'
      },
      {
        controlType: 'select',
        order: 4,
        required: true,
        key: 'select'
      }
    ]
    this.createFormGroup(this.controls);
  }

  createFormGroup(control:ControlBase[]) {
    let group: any = {};
    control.forEach((element:ControlBase) => {
      if(element.controlType !== 'label') {
        group[element.key]= element.required ? new FormControl('',Validators.required) : new FormControl('');
      }
    });
    this.form = new FormGroup(group);
  }

  submitForm() {
    console.log(this.form);
  }
}
