import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
import { FilterableBarComponent, FilterableBarConfig, FilterableBarData, FilterableBarVisConfig } from '@app/home/filterable-bar/filterable-bar.component';
import { of } from 'rxjs/observable/of';
import { WidgetConfig, VisConfig } from '@app/home/visualization-models';
import { SimpleMetricVisConfig,SimpleMetricData, SimpleMetricConfig } from '@app/home/simple-metric/simple-metric.component';

const routes = {
  quote: (c: RandomQuoteContext) => `/jokes/random?category=${c.category}`
};

export interface RandomQuoteContext {
  // The quote's category: 'dev', 'explicit'...
  category: string;
}

@Injectable()
export class QuoteService {

  constructor(private httpClient: HttpClient) { }


  getBarConfig(duration: number = 1000, title: string = 'Foo') : WidgetConfig {
    const ret = new WidgetConfig( this.getFilterableBarGenericConfig(duration));
    ret.link = title + ' Link';
    ret.title = title + ' Bar Chart'
    return ret;
  }

  getSimpleMtricConfig(duration: number = 1000, title: string = 'Foo') : WidgetConfig {
    const ret = new WidgetConfig( this.getSimpleMetricGenericConfig(duration));
    ret.link = title + ' Link';
    ret.title = title + ' Simple Metric'
    return ret;
  }

  getFilterableBarGenericConfig(speed: number = 1000): FilterableBarVisConfig {
    const  visConfig = new FilterableBarVisConfig();
    // visConfig.componentClass = typeof FilterableBarComponent;
    visConfig.config = {configOption: 'Show IT'} as FilterableBarConfig;
    visConfig.dataProvider = () => {
      return new Observable<FilterableBarData>((observer: Observer<FilterableBarData>)  => {
        setTimeout(() => {
          observer.next({name: 'bar',value: 'bardata'} as FilterableBarData); 
          observer.complete();
        }, speed);
    });
    };
    return visConfig;
  }

  getSimpleMetricGenericConfig(speed: number = 1000): SimpleMetricVisConfig {
    const  visConfig = new SimpleMetricVisConfig();
    // visConfig.componentClass = typeof FilterableBarComponent;
    visConfig.config = {configOption: 'DONT SHOW'} as SimpleMetricConfig;
    visConfig.dataProvider = () => {
      return new Observable<SimpleMetricData>((observer: Observer<SimpleMetricData>)  => {
        setTimeout(() => {
          observer.next({name: 'simple',value: '333'} as SimpleMetricData); 
          observer.complete();
        }, speed);
    });
    };
    return visConfig;
  }





}
