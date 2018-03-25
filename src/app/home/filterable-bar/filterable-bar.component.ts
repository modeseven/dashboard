import { Component, OnInit, Input } from '@angular/core';
import { Visualization } from '@app/home/visualization-models';
import { Observable } from 'rxjs/Observable';
import { WidgetConfig, VisConfig } from '@app/home/visualization-models';
import * as c3 from 'c3'

/**
 * static config
 */
export class FilterableBarConfig {
  configOption: string;
}

/**
 * the data this chart needs
 */
export class FilterableBarData {
  name: string;
  value: string;
  data: any;
}

/**
 * VisConfig implementation
 */
export class FilterableBarVisConfig implements VisConfig {
  componentClass: any = FilterableBarComponent;
  config: FilterableBarConfig;
  dataProvider: () => Observable<FilterableBarData>;
}

@Component({
  selector: 'app-filterable-bar',
  templateUrl: './filterable-bar.component.html',
  styleUrls: ['./filterable-bar.component.scss']
})
export class FilterableBarComponent implements OnInit, Visualization {

  @Input() visConfig: FilterableBarVisConfig;
  chartId: string;

  dataProvider: () => Observable<FilterableBarData>;
  config: FilterableBarConfig;

  data: any;

  constructor() {
    this.chartId = 'chart_' + this.guid();
  }

  render() {
    this.data = null;
    this.visConfig.dataProvider().subscribe((res) => {
      console.log('got the data.. render it nicely!');
      this.data = res;
      let chart = c3.generate({
        bindto: '#' + this.chartId,
        data: this.data.data
      });
    });
  }

  ngOnInit() {
    this.config = this.visConfig.config;
    console.log('FilterableBarComponent init!');
    
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4();
  }

  ngAfterViewInit() {
    this.render();
  }

}


