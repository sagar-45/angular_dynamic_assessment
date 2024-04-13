import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  LineChart: any =[];
  @Input() rangeStart: number =0;
  @Input() rangeEnd: number = 0;
  simpleData: number[] = []
  errorData: number[] = [];

  constructor() { }

  ngOnChanges() {
    this.simpleData.push(this.rangeStart,this.rangeEnd);
    this.errorData.push(this.rangeStart,this.rangeEnd);
    for(let i=0;i<5;i++) {
      let num1 = Math.floor(Math.random() * (this.rangeEnd - this.rangeStart + 1) + this.rangeStart);
      this.simpleData.push(num1);
      let num2 = Math.floor(Math.random() * (this.rangeEnd - this.rangeStart + 1) + this.rangeStart);
      this.errorData.push(num2);
    }
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Mo',
      'Tu',
      'We',
      'Th',
      'Fr',
      'Sa',
      'Su'
    ],
    datasets: [
            {
              label: 'Simple',
              data: this.simpleData,
              backgroundColor: 'blue',
              borderColor: 'lightblue',
              fill: false
            },
            {
              label: 'Error rate',
              data: this.errorData,
              backgroundColor: 'green',
              borderColor: 'lightgrey',
              fill: false
            },
          ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;
  ngOnInit(): void {
  }

}
