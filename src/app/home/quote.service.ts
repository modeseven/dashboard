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


  getBarConfig( title: string = 'Foo',ep: string = 'mockEndPoint1') : WidgetConfig {
    const ret = new WidgetConfig( this.getFilterableBarGenericConfig(ep));
    ret.link = title + ' Link';
    ret.title = title + ' Bar Chart'
    return ret;
  }

  getSimpleMtricConfig( title: string = 'Foo') : WidgetConfig {
    const ret = new WidgetConfig( this.getSimpleMetricGenericConfig(1000));
    ret.link = title + ' Link';
    ret.title = title + ' Simple Metric'
    return ret;
  }

  getFilterableBarGenericConfig( ep: string): FilterableBarVisConfig {
    const  visConfig = new FilterableBarVisConfig();
    visConfig.config = {configOption: 'Show IT'} as FilterableBarConfig;
    visConfig.dataProvider = this[ep];
    return visConfig;
  }

  getSimpleMetricGenericConfig(speed: number = 1000): SimpleMetricVisConfig {
    const  visConfig = new SimpleMetricVisConfig();
    visConfig.config = {configOption: 'show something'} as SimpleMetricConfig;
    visConfig.dataProvider = this.mockSimpleMetric;
    return visConfig;
  }

  // mock endpoints........

  mockSimpleMetric = () => {
    return new Observable<SimpleMetricData>((observer: Observer<SimpleMetricData>)  => {
      setTimeout(() => {
        observer.next({name: 'DateTime',value: new Date().toLocaleTimeString() } as SimpleMetricData); 
        observer.complete();
      }, 1212);
  });
  };

  mockEndPoint1 = () => {
    return new Observable<FilterableBarData>((observer: Observer<FilterableBarData>)  => {
      setTimeout(() => {
        observer.next({name: 'bar',value: 'bardata', data: {
          columns: [
              ['bar', 30, 200, 232, 222, 150, 250],
              ['baz', 50, 20, 10, 40, 15, 25]
          ]
      } } as FilterableBarData); 
        observer.complete();
      }, 1212);
  });
  };

  mockEndPoint2 = () => {
    return new Observable<FilterableBarData>((observer: Observer<FilterableBarData>)  => {
      setTimeout(() => {
        observer.next({name: 'bar',value: 'bardata', data: {
          columns: [
              ['foo', 30, 200, 100, 400, 150, 250]             
          ]
      } } as FilterableBarData); 
        observer.complete();
      }, 2001);
  });
  };

  mockEndPoint3 = () => {
    return new Observable<FilterableBarData>((observer: Observer<FilterableBarData>)  => {
      setTimeout(() => {
        observer.next({name: 'bar',value: 'bardata', data: {
          columns: [
              ['flip', 455, 33, 213, 231, 766, 67]             
          ]
      } } as FilterableBarData); 
        observer.complete();
      }, 500);
  });
  };





}
