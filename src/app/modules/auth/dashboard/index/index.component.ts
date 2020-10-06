import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { single, multi, times, limit } from './data';
import { DashboardService } from '../../../../services/dashboard.service';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  formFilter: FormGroup;

  cards = [
    {
      title: 'Receitas',
      subTitle: '',
      icon: 'call_received',
      color: 'card-color-green',
    },
    {
      title: 'Despesas',
      subTitle: '',
      icon: 'call_made',
      color: 'card-color-red',
    },
    {
      title: 'Contas a Pagar',
      subTitle: '',
      icon: 'attach_money',
      color: 'card-color-yellow',
    },
    {
      title: 'Contas a Receber',
      subTitle: '',
      icon: 'account_balance',
      color: 'card-color-blue',
    },
    {
      title: 'Saldo Disponível',
      subTitle: '',
      icon: 'account_balance',
      color: 'card-color-blue',
    },
    {
      title: 'Saldo Previsto',
      subTitle: '',
      icon: 'account_balance',
      color: 'card-color-blue',
    }
  ];

  times;
  single;
  multi = multi;
  limits = limit;

  view: any[];
  viewGauge = [300, 100];
  legendPosition;

  hide = false;

  destroy$ = new Subject();

  constructor(
    private _dashboardService: DashboardService,
    private _toastrService: ToastrService,
    private _loadingService: LoadingService
  ) {
    this.changeResponsiveness();
  }

  ngOnInit(): void {
    this.onResize();
    this.createFormFilter();
    this.getCards();
    this.getLineChart();
    this.getPieChartData();
  }

  createFormFilter(): void {
    this.formFilter = new FormGroup({
      dtPeriodo1: new FormControl(null),
      dtPeriodo2: new FormControl(null)
    });

    this.listenDtPeriodo2();
  }

  listenDtPeriodo2(): void {
    this.formFilter.get('dtPeriodo2').valueChanges.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (data) {
        this.getPieChartData();
      }
    });
  }

  getCards(): void {
    this.getExpense();
    this.getRevenue();
    this.getTotalAccountsPayable();
    this.getTotalAccountsReceivable();
    this.getBalance();
    this.getExpectedBalance();
  }



  getExpense(): void {
    this._dashboardService.getExpense().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.cards[0].subTitle = 'R$ ' + response.total;
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  getRevenue(): void {
    this._dashboardService.getRevenue().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.cards[1].subTitle = 'R$ ' + response.total;
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  getTotalAccountsPayable(): void {
    this._dashboardService.getTotalAccountsPayable().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.cards[2].subTitle = 'R$ ' + response.total;
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  getTotalAccountsReceivable(): void {
    this._dashboardService.getTotalAccountsReceivable().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.cards[3].subTitle = 'R$ ' + response.total;
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  getBalance(): void {
    this._dashboardService.getBalance().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.cards[4].subTitle = 'R$ ' + response.total;
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  getOverdueBills(): void {
    this._dashboardService.getOverdueBills().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.cards[5].subTitle = 'R$ ' + response.total;
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }


  getExpectedBalance(): void {
    this._dashboardService.getExpectedBalance().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.cards[5].subTitle = 'R$ ' + response.total;
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  getLineChart(): void {
    this._dashboardService.getLineChart().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.times = response.data.map(element => {
            element.series = element.items.map(item => {
              item.value = parseFloat(item.value);
              return item;
            });
            element.name = element.descricao;
            delete element.items;
            delete element.descricao;
            return element;
          });
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  getPieChartData(): void {
    let payload = {};

    if (this.formFilter.value.dtPeriodo1 && this.formFilter.value.dtPeriodo2) {

      payload = {
        dtPeriodo1: moment(this.formFilter.value.dtPeriodo1).format('YYYY-MM-DD'),
        dtPeriodo2: moment(this.formFilter.value.dtPeriodo2).format('YYYY-MM-DD')
      };
    }

    this._dashboardService.getPieChartData(payload).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.single = response.data;
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  onResize = () => window.addEventListener('resize', () => {
    this.changeResponsiveness();
  })

  changeResponsiveness(): void {
    this.legendPosition = 'right';
    if (window.innerWidth < 600) {
      this.legendPosition = 'bellow';
      this.view = [window.innerWidth / 1.2, 180];
    } else if (window.innerWidth > 600 && window.innerWidth < 960) {
      this.view = [window.innerWidth / 1.2, 230];
    } else if (window.innerWidth > 959 && window.innerWidth < 1281) {
      this.view = [window.innerWidth / 2.5, 230];
    } else if (window.innerWidth > 1280 && window.innerWidth < 1601) {
      this.view = [window.innerWidth / 2.5, 180];
    } else {
      this.view = [window.innerWidth / 2.2, 280];
    }
  }

  axisDate(val: string): string {
    return new DatePipe('en').transform(val, 'dd MMMM');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
