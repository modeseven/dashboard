import { Component, OnInit, Input } from '@angular/core';
import { Visualization } from '@app/home/visualization-models';
import { Observable } from 'rxjs/Observable';
import { WidgetConfig, VisConfig } from '@app/home/visualization-models';

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
}

/**
 * VisConfig implementation
 */
export class FilterableBarVisConfig implements VisConfig {
  componentClass: any = FilterableBarComponent ;
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

  dataProvider: () => Observable<FilterableBarData>;  
  config: FilterableBarConfig;

  data: any;

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
    console.log('FilterableBarComponent init!');
    this.render();
  }

}


