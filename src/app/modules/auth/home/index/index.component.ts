import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  cards = [
    { 
      title: 'Funcionário 1', 
      userPhoto: 'Manicure e Pedicure', 
      subtitle: 'Manicure e Pedicure', 
      imageUrl: 'https://statig3.akamaized.net/bancodeimagens/ca/da/1r/cada1rd31e8gmyrvopj4ognap.jpg',
      description: 'Alguma descrição do Serviço aqui' 
    },
    {title: 'Funcionário 2', userPhoto: 'Manicure e Pedicure', subtitle: 'Manicure e Pedicure', imageUrl: 'https://statig3.akamaized.net/bancodeimagens/ca/da/1r/cada1rd31e8gmyrvopj4ognap.jpg', description: 'Alguma descrição do Serviço aqui'},
    {title: 'Funcionário 3', userPhoto: 'Manicure e Pedicure', subtitle: 'Manicure e Pedicure', imageUrl: 'https://statig3.akamaized.net/bancodeimagens/ca/da/1r/cada1rd31e8gmyrvopj4ognap.jpg', description: 'Alguma descrição do Serviço aqui'},
    {title: 'Funcionário 4', userPhoto: 'Manicure e Pedicure', subtitle: 'Manicure e Pedicure', imageUrl: 'https://statig3.akamaized.net/bancodeimagens/ca/da/1r/cada1rd31e8gmyrvopj4ognap.jpg', description: 'Alguma descrição do Serviço aqui'},
    {title: 'Funcionário 5', userPhoto: 'Manicure e Pedicure', subtitle: 'Manicure e Pedicure', imageUrl: 'https://statig3.akamaized.net/bancodeimagens/ca/da/1r/cada1rd31e8gmyrvopj4ognap.jpg', description: 'Alguma descrição do Serviço aqui'},
    {title: 'Funcionário 6', userPhoto: 'Manicure e Pedicure', subtitle: 'Manicure e Pedicure', imageUrl: 'https://statig3.akamaized.net/bancodeimagens/ca/da/1r/cada1rd31e8gmyrvopj4ognap.jpg', description: 'Alguma descrição do Serviço aqui'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
