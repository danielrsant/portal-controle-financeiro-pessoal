import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title = 'Título do Componente';
  @Input() subtitle = 'Subtítulo do Componente';

  constructor() { }

  ngOnInit(): void { }

}
