import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { single, multi, times } from '../data';

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
      icon: 'content_copy',
      color: 'card-color-yellow'
    },
    {
      title: 'Despesas',
      subTitle: 'R$ 100,00',
      footerIcon: 'date_range',
      footerTitle: 'Teste de descrição',
      icon: 'info_outline',
      color: 'card-color-red'
    },
    {
      title: 'Compras',
      subTitle: 'R$ 100,00',
      footerIcon: 'update',
      footerTitle: 'Teste de descrição',
      icon: 'store',
      color: 'card-color-green'
    },
    {
      title: 'Cartão',
      subTitle: 'R$ 100,00',
      footerIcon: 'date_range',
      footerTitle: 'Teste de descrição',
      icon: 'payment',
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
    this.view = innerWidth < 600 ? [innerWidth / 1.2, 185] : [innerWidth / 4, 280];
    this.legendPosition = innerWidth < 600 ? 'bellow' : 'right';
   }

  ngOnInit(): void {
    this.onResize();
   }

  onResize = () => window.addEventListener('resize', () => {
    if (window.innerWidth < 600) {
      this.legendPosition = 'bellow';
      this.view = [window.innerWidth / 1.2, 185];
    } else {
      this.legendPosition = 'right';
      this.view = [window.innerWidth / 4, 280];
    }
  })

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
