import { Observable } from "rxjs/Observable";

export class VisConfig {
    componentClass: any;
    config: any;
    dataProvider: () => Observable<any>;
}

/**
 * config for widget (incldue 1 VisConfig)
 */
export class WidgetConfig {
    visConfig: VisConfig;
    title: string;
    link: string;

    constructor(visConfig: VisConfig) {
        this.visConfig = visConfig;
    }
}

export interface Visualization {
    visConfig: VisConfig;
    data: any;
    render(): void;
 }

