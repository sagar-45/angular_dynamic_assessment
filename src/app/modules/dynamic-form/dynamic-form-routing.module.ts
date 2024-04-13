import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormHomeComponent } from 'src/app/components/dynamic-form-home/dynamic-form-home.component';
import { ShowFormComponent } from 'src/app/components/show-form/show-form.component';
import { CreateFormComponent } from 'src/app/components/create-form/create-form.component';

const routes: Routes = [
  {
    path:'show',
    component: ShowFormComponent
  },
  {
    path:'create',
    component: CreateFormComponent
  },
  {
    path:'',
    component:DynamicFormHomeComponent,
    pathMatch:'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DynamicFormRoutingModule { }
