import { Config } from 'app/shared/components/several-components/data-table/config';
import { Subscription, Subject } from 'rxjs';

import { Operation } from '../enums/operation';

export interface IView {
  title: string;
  iconName: string;
  operation: Operation;
  dataSource: any[];
  onDestroy$: Subject<boolean>;
  configuration: Config;

  onRefresh(params?: any): void;
}
