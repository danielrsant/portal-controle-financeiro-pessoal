import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { single, multi, times, limit } from './data';

@Component({ 
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  cards = [
    {
      title: 'Receitas',
      subTitle: 'R$ 4.200,00',
      icon: 'call_received',
      color: 'card-color-green',
      footerIcon: 'call_received',
      footerTitle: 'Receita é todo recurso proveniente da venda de mercadorias ou de uma prestação de serviços',
    },
    {
      title: 'Despesas',
      icon: 'call_made',
      color: 'card-color-red',
      subTitle: 'R$ 3.200,00',
      footerIcon: 'call_made',
      footerTitle: 'Despesa é todo o gasto de caráter geral, relacionado com a administração e vendas',
    },
    {
      title: 'Salário',
      subTitle: 'R$ 3.500,00',
      icon: 'attach_money',
      color: 'card-color-yellow',
      footerIcon: 'attach_money',
      footerTitle: 'Remuneração recebida por serviço(s) prestado(s)',
    },
    {
      title: 'Cofre',
      subTitle: 'R$ 10.000,00',
      icon: 'account_balance',
      color: 'card-color-blue',
      footerIcon: 'date_range',
      footerTitle: 'Cofre é onde está todo o dinheiro guardado ou investido',
    }
  ];
  
  times = times;
  multi = multi;
  single = single;
  limits = limit;

  view: any[];
  viewGauge = [300, 100];
  legendPosition;

  hide = false;
  
  constructor() {
    this.changeResponsiveness();
   }

  ngOnInit(): void {
    this.onResize();
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
    }else {
      this.view = [window.innerWidth / 2.2, 280];
    }
  }

  axisDate(val: string): string {
    return new DatePipe('en').transform(val, 'dd MMMM');
  }
}
