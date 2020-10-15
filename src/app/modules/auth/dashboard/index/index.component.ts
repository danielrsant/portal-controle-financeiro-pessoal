import { CurrencyPipe, DatePipe } from '@angular/common';
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
      icon: 'call_made',
      color: 'card-color-green',
    },
    {
      title: 'Despesas',
      subTitle: '',
      icon: 'call_received',
      color: 'card-color-red',
    },
    {
      title: 'Contas a Pagar',
      subTitle: '',
      icon: 'receipt',
      color: 'card-neon-life',
    },
    {
      title: 'Contas a Receber',
      subTitle: '',
      icon: 'receipt',
      color: 'card-color-yellow',
    },
    {
      title: 'Contas Atrasadas',
      subTitle: '',
      icon: 'assignment_late',
      color: 'card-color-purple',
    },
    {
      title: 'Saldo Disponível',
      subTitle: '',
      icon: 'account_balance_wallet',
      color: 'card-color-blue',
    },
    {
      title: 'Saldo Previsto',
      subTitle: '',
      icon: 'request_page',
      color: 'card-color-pinot-noir',
    },
    {
      title: 'Balanço Diário',
      subTitle: '',
      icon: 'account_balance',
      color: 'card-color-orange',
    },
  ];

  times;
  single;
  limits = [];
  multi = multi;

  view: any[];
  viewGauge = [300, 100];
  legendPosition;

  hide = false;

  destroy$ = new Subject();

  constructor(
    private _dashboardService: DashboardService,
    private _toastrService: ToastrService,
    private _loadingService: LoadingService,
    private _currencyPipe: CurrencyPipe
  ) {
    this.changeResponsiveness();
  }

  ngOnInit(): void {
    this.onResize();
    this.createFormFilter();
    this.getCards();
    this.getLineChart();
    this.getPieChartData();
    this.getLimits();
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
    this.getOverdueBills();
  }


  // DESPESAS
  getExpense(): void {
    this._dashboardService.getExpense().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.cards[1].subTitle = this._currencyPipe.transform(response.total, 'BRL');
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  // RECEITAS
  getRevenue(): void {
    this._dashboardService.getRevenue().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.cards[0].subTitle = this._currencyPipe.transform(response.total, 'BRL');
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  // CONTAS A PAGAR
  getTotalAccountsPayable(): void {
    this._dashboardService.getTotalAccountsPayable().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.cards[2].subTitle = response.total;
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  // CONTAS A RECEBER
  getTotalAccountsReceivable(): void {
    this._dashboardService.getTotalAccountsReceivable().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.cards[3].subTitle = response.total;
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

   // ATRASADAS
   getOverdueBills(): void {
    this._dashboardService.getOverdueBills().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.cards[4].subTitle = response.total;
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  // SALDO DISPONÍVEL
  getBalance(): void {
    this._dashboardService.getBalance().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.cards[5].subTitle = this._currencyPipe.transform(response.total, 'BRL');
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  // SALDO PREVISTO
  getExpectedBalance(): void {
    this._dashboardService.getExpectedBalance().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.cards[6].subTitle = this._currencyPipe.transform(response.total, 'BRL');
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
          const despesa: any = {};
          const receita: any = {};
          despesa.name = 'Despesas';
          receita.name = 'Receitas';
          despesa.series = [];
          receita.series = [];

          response.data.forEach(element => {
            element.items.forEach(item => {
              despesa.series = [...despesa.series, ...[{
                value: parseFloat(item.total_despesa),
                name: item.name
              }]];
              receita.series = [...receita.series, ...[{
                value: parseFloat(item.total_receita),
                name: item.name
              }]];
            });

            this.times = [ despesa, receita ];
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
          this.single = response.data.map(element => {
            element.value = parseFloat(element.value);
            delete element.limite;
            return element;   
          });
        }
      },
      (error) => {
        this._loadingService.hide();
      }
    );
  }

  getLimits(): void {
    this._dashboardService.getLimits().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          response.data.forEach(element => {
            const max = parseFloat(element.limite) + parseFloat(element.limite);
            const limitValue = parseFloat(element.limite);
            const value = parseFloat(element.value);

            let status = '';
            let icon = '';
            let color = '';

            if (limitValue < value) {
              status = 'Ultrapassou o limite!';
              icon = 'sentiment_very_dissatisfied';
              color = 'red';
            } else if ((limitValue / 2) > value && limitValue < value) {
              status = 'Quase lá!';
              icon = 'sentiment_satisfied';
              color = 'yellow';
            } else {
              status = 'Longe do Limite!';
              icon = 'mood';
              color = 'green';
            }

            this.limits.push({
                category: element.name,
                status: status,
                icon: icon,
                color: color,
                max: max,
                limit: limitValue,
                value: value,
            });
          });
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

  getFormattedPrice(price: number): any {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  }

  formatDataLabel(value): string {
    return value + ' reais';
  }

  formatDataLabel2(value): string {
    return value + '%';
  }
 
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
