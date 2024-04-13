import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  datas: any = [];
  constructor() {}

  saveData(data: any) {
    let categories = this.getDatas();
    categories.push(data);
    localStorage.setItem('categoryData', JSON.stringify(categories));
  }

  getDatas() {
    if (!localStorage.getItem('categoryData')) {
      localStorage.setItem('categoryData', JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem('categoryData') as string);
  }

  editData(oldData: number, newData: any, index: number) {
    let categories = this.getDatas();
    categories[index] = newData;
    localStorage.setItem('categoryData', JSON.stringify(categories));
  }

  deleteData(index: number) {
    let categories = this.getDatas();
    categories.forEach((element: any, i: number) => {
      if (i == index) categories.splice(i, 1);
    });
    localStorage.setItem('categoryData', JSON.stringify(categories));
  }

  checkAssessment(data: any) {
    let categories = this.getDatas();
    let object = categories.find(
      (x: any) => x.assessmentName == data.assessmentName
    );
    if (object) {
      if (object.body_region.length == data.body_region.length) {
        let count = 0;
        object.body_region.forEach((element: string, index: number) => {
          if (data.body_region.indexOf(element) !== -1) {
            count++;
          }
        });
        if (count == object.body_region.length) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    return false;
  }
}
