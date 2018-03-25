import { Component, OnInit, Input } from '@angular/core';
import { Visualization } from '@app/home/visualization-models';
import { Observable } from 'rxjs/Observable';
import { WidgetConfig, VisConfig } from '@app/home/visualization-models';

/**
 * static config
 */
export class SimpleMetricConfig {
  configOption: string;
}

/**
 * the data this chart needs
 */
export class SimpleMetricData {
  name: string;
  value: string;
}

/**
 * VisConfig implementation
 */
export class SimpleMetricVisConfig implements VisConfig {
  componentClass: any = SimpleMetricComponent ;
  config: SimpleMetricConfig;
  dataProvider: () => Observable<SimpleMetricData>;
}

@Component({
  selector: 'app-simple-metric',
  templateUrl: './simple-metric.component.html',
  styleUrls: ['./simple-metric.component.scss']
})
export class SimpleMetricComponent implements OnInit, Visualization {

  @Input() visConfig: SimpleMetricVisConfig;

  dataProvider: () => Observable<SimpleMetricData>;  
  config: SimpleMetricConfig;

  data: SimpleMetricData;

  constructor() { }

  render(){
    this.data = null;
   this.visConfig.dataProvider().subscribe( (res) => {
     console.log('got the data.. render it nicely!');
      this.data = res;
    }  );
  }

  ngOnInit() {
    this.config = this.visConfig.config;
    console.log('SimpleMetricVisConfig init!');
    this.render();
  }

}
