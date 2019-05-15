import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-donught',
  templateUrl: './donught.component.html',
  styles: []
})
export class DonughtComponent implements OnInit {
  @Input() leyenda: string = '';
  @Input() chartLabels: Label[] = [];
  @Input() chartData: MultiDataSet = [];
  @Input() chartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
