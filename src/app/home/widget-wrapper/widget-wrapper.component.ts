import { NgModule, Component, Compiler, ViewContainerRef, ViewChild, Input, ComponentRef, ComponentFactory, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { WidgetConfig, VisConfig } from '@app/home/visualization-models';
import { Visualization } from '@app/home/visualization-models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'widget-wrapper',
  template: `<mat-card>

  <mat-card-title>
  <h2> {{widgetConfig.title}} Widget   <a href="{{widgetConfig.link}}">link</a> </h2>
  </mat-card-title>
  
  <mat-spinner  *ngIf="loading" ></mat-spinner>
  <div  #target></div>
  <button (click)="reload()">reload</button>
  </mat-card>
  `
})
export class WidgetWrapperComponent {

  @ViewChild('target', { read: ViewContainerRef }) target: any;
  @Input() widgetConfig: WidgetConfig;
  cmpRef: ComponentRef<any>;
  private isViewInitialized: boolean = false;
  loading: boolean = false;
  realDataProvider: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private compiler: Compiler,
    private cdRef: ChangeDetectorRef) { }

  updateComponent() {
    console.log('widgetconfig?' + JSON.stringify(this.widgetConfig));
    if (!this.isViewInitialized) {
      return;
    }
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    let factory = this.componentFactoryResolver.resolveComponentFactory(this.widgetConfig.visConfig.componentClass);

    this.realDataProvider = this.widgetConfig.visConfig.dataProvider;
    
   
    this.loading = true;

    // pass vis specific config and provider to Vis
    this.widgetConfig.visConfig.dataProvider().subscribe((resp) => {
      const preResolved = () => {
        return Observable.of(resp);
      }
      
      this.widgetConfig.visConfig.dataProvider = preResolved;
      this.cmpRef = this.target.createComponent(factory);
      this.cmpRef.instance.visConfig = this.widgetConfig.visConfig;
      
      this.loading = false;

    });
    this.cdRef.detectChanges();
  }

  reload() {
    console.log("reload");
    this.loading = true;
    this.cmpRef.destroy();

    let factory = this.componentFactoryResolver.resolveComponentFactory(this.widgetConfig.visConfig.componentClass);   
    this.loading = true;

    this.realDataProvider().subscribe((resp: any) => {
      const preResolved = () => {
        return Observable.of(resp);
      }      
      this.widgetConfig.visConfig.dataProvider = preResolved;
      this.cmpRef = this.target.createComponent(factory);
      this.cmpRef.instance.visConfig = this.widgetConfig.visConfig;      
      this.loading = false;
    });
    this.cdRef.detectChanges();
  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.updateComponent();
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }

}
