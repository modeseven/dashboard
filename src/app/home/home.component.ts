import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { FilterableBarComponent } from './filterable-bar/filterable-bar.component';
import { WidgetConfig, VisConfig } from '@app/home/visualization-models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quote: string;
  isLoading: boolean;
  widgets:  WidgetConfig[] = [];

  freeConfig: VisConfig;

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.isLoading = true;

      this.widgets.push(this.quoteService.getBarConfig('Foo','mockEndPoint1'));
      this.widgets.push(this.quoteService.getBarConfig('Bar','mockEndPoint2'));
      this.widgets.push(this.quoteService.getSimpleMtricConfig('Baz'));     

      this.freeConfig = this.quoteService.getFilterableBarGenericConfig('mockEndPoint3');

  }

}
