import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  editData: any;
  editIndex: number = -1;
  viewData: any;
  constructor() { }

  setEditData(data: any,index: number) {
    this.editData = data;
    this.editIndex = index;
  }

  getEditData() {
    return this.editData;
  }

  getEditIndex() {
    return this.editIndex;
  }

  setViewData(data: any) {
    this.viewData = data;
  }

  getViewData() {
    return this.viewData;
  }
}
