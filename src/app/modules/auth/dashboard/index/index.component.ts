import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { single, multi, times } from './data';

@Component({ 
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  cards = [
    {
      title: 'Receitas',
      subTitle: 'R$ 100,00',
      footerIcon: 'warning',
      footerTitle: 'Teste de descrição',
      icon: 'call_received',
      color: 'card-color-green'
    },
    {
      title: 'Despesas',
      subTitle: 'R$ 100,00',
      footerIcon: 'date_range',
      footerTitle: 'Teste de descrição',
      icon: 'call_made',
      color: 'card-color-red'
    },
    {
      title: 'Salário',
      subTitle: 'R$ 3.500,00',
      footerIcon: 'update',
      footerTitle: 'Teste de descrição',
      icon: 'attach_money',
      color: 'card-color-yellow'
    },
    {
      title: 'Cofre',
      subTitle: 'R$ 10.000,00',
      footerIcon: 'date_range',
      footerTitle: 'Teste de descrição',
      icon: 'account_balance',
      color: 'card-color-blue'
    }
  ];
  
  times = times;
  multi = multi;
  single = single;

  view: any[];
  viewGauge = [300, 100];
  legendPosition;

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

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
