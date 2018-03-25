import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { WidgetService } from './widget.service';
import { FilterableBarComponent } from './filterable-bar/filterable-bar.component';
import { WidgetConfig, VisConfig } from '@app/home/visualization-models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  widgets:  WidgetConfig[] = [];

  freeConfig: VisConfig;

  constructor(private quoteService: WidgetService) { }

  ngOnInit() {

      this.widgets.push(this.quoteService.getBarWidgetConfig('Foo','mockEndPoint1'));
      this.widgets.push(this.quoteService.getBarWidgetConfig('Bar','mockEndPoint2'));
      this.widgets.push(this.quoteService.getSimpleMtricWidgetConfig('Baz'));     

      this.freeConfig = this.quoteService.getFilterableBarVisConfig('mockEndPoint3');

  }

}
