import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  @Input() expanded: boolean = true;
  @Input() title: string = 'Filtro';
  @Input() icon: string = 'filter_list';

  constructor() { }

  ngOnInit() {
  }

}
