import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from 'src/app/components/home/home.component';
import { AddCategoryComponent } from 'src/app/components/add-category/add-category.component';

import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';

import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgChartsModule } from 'ng2-charts';
import { LineChartComponent } from 'src/app/components/line-chart/line-chart.component';
import { ViewComponent } from 'src/app/components/view/view.component';

const materialModules = [
  MatTableModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatCardModule
]

@NgModule({
  declarations: [HomeComponent, AddCategoryComponent,
    LineChartComponent, ViewComponent],
  imports: [
    CommonModule,
    materialModules,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxMaterialTimepickerModule,
    NgChartsModule
  ],
  exports: [
    materialModules
  ]
})
export class SharedModule { }
