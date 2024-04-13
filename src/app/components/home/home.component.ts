import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditService } from 'src/app/service/edit.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private storeService: StoreService, private router: Router, private editService: EditService) { }

  data: any =[]
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.data = this.storeService.getDatas();
  }

  edit(data: any,index: number) {
    this.editService.setEditData(data,index);
    this.router.navigateByUrl('/editCategory');
  }

  viewData(data: any) {
    this.editService.setViewData(data);
    this.router.navigateByUrl('/viewCategory');
  }

  deleteData(index: number) {
    this.data.splice(index,1);
    this.storeService.deleteData(index);
  }

}
