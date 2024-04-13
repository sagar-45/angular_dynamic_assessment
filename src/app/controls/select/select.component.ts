import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlBase } from 'src/app/interface/control-base';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  constructor() { }
  @Input() form!: FormGroup;
  @Input() control!: ControlBase;

  ngOnInit(): void {
  }

}
