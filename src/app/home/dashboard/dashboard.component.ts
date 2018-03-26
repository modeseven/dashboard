import { Component, OnInit, Input } from '@angular/core';
import { WidgetConfig } from '@app/home/visualization-models';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input()  widgets:  WidgetConfig[] = [];

  constructor() { }

  ngOnInit() {
  }

}
