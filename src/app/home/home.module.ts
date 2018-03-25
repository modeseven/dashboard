import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WidgetService } from './widget.service';
import { WidgetWrapperComponent } from './widget-wrapper/widget-wrapper.component';
import { FilterableBarComponent } from './filterable-bar/filterable-bar.component';
import { SimpleMetricComponent } from './simple-metric/simple-metric.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    WidgetWrapperComponent,
    FilterableBarComponent,
    SimpleMetricComponent,
    DashboardComponent
  ],
  entryComponents: [FilterableBarComponent, SimpleMetricComponent],
  providers: [
    WidgetService
  ]
})
export class HomeModule { }
