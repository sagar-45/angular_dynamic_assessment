import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlBase } from 'src/app/interface/control-base';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() form!: FormGroup;
  @Input() control!: ControlBase;
  constructor() { }

  ngOnInit(): void {
  }

}
