import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { HomeComponent } from './components/home/home.component';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [
  {
    path: 'addCategory',
    component: AddCategoryComponent
  },
  {
    path: 'editCategory',
    component: AddCategoryComponent
  },
  {
    path: 'viewCategory',
    component: ViewComponent
  },
  {
    path:'dynamicForm',
    loadChildren:() =>import('./modules/dynamic-form/dynamic-form.module').then(m => m.DynamicFormModule)
  },
  {
    path:'',
    component: HomeComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
