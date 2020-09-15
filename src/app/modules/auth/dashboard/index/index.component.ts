import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { single, multi, pie, times } from '../data';

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

  view = window.innerWidth < 600 ? [window.innerWidth / 4, window.innerWidth / 2.5] : [window.innerWidth / 2.5, window.innerWidth / 6];
  viewGauge = [300, 100];

  constructor() { }

  ngOnInit(): void {
    this.onResize();
   }

  onResize = () => window.addEventListener('resize', () =>
  this.view = window.innerWidth < 600 ? [window.innerWidth / 3, window.innerWidth / 3] : [window.innerWidth / 2.5, window.innerWidth / 6]
  )

  axisDate(val: string): string {
    return new DatePipe('en').transform(val, 'dd MMMM');
  }
}
