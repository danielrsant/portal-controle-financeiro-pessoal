import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss']
})
export class BusinessCardComponent implements OnInit {
  @Input() data: any;

  type: string;
  cpfMask = '000.000.000-00';
  cnpjMask = '00.000.000/0000-0'
  telphoneMask = '(00) 0000-0000';
  telephoneMask = '(00) 00000-0000';

  constructor() { }

  ngOnInit() {
    if (this.data.technicians.length) {
      this.type = 'Instalador';
    } else if (this.data.transporters.length) {
      this.type = 'Instalador / Entregador';
    }
    if (this.data.transporters.length) {
      this.type = 'Entregador';
    }
    if (this.data.companies.length) {
      this.type = 'Empresa';
    }
    if (this.data.users[0] && this.data.users[0].profiles) {
      this.type = 'Administrador da Plataforma';
    }
  }

}
