import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormHomeComponent } from 'src/app/components/dynamic-form-home/dynamic-form-home.component';
import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { ShowFormComponent } from 'src/app/components/show-form/show-form.component';
import { InputComponent } from 'src/app/controls/input/input.component';
import { LabelComponent } from 'src/app/controls/label/label.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from 'src/app/controls/select/select.component';



@NgModule({
  declarations: [DynamicFormHomeComponent,ShowFormComponent,InputComponent,LabelComponent,SelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormRoutingModule
  ]
})
export class DynamicFormModule { }
