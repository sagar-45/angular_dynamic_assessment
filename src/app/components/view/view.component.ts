import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditService } from 'src/app/service/edit.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private editService: EditService, private router: Router) { }
  data: any;
  ngOnInit(): void {
    this.data = this.editService.getViewData();
    if(!this.data) {
      this.router.navigateByUrl('');
    } 
  }
  getId(i:number){
    return '#'+i;
  }

  back() {
    this.router.navigateByUrl('');
  }
}
