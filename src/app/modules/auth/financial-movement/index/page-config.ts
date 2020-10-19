import { IFormField } from 'src/app/shared/interfaces/form-filter.interface';
import { TableColumn } from 'src/app/shared/models/table-column.interface';

export class PageConfig {

  columns: TableColumn<any>[] = [
    {
      label: 'Ações',
      property: 'actions',
      type: 'actions',
      visible: true,
      align: 'start'
    },
    {
      label: 'Id',
      property: 'id',
      type: 'text',
      visible: true,
      align: 'start',
      sort: true
    },
    {
      label: 'Descrição',
      property: 'descricao',
      type: 'text',
      visible: true,
      align: 'start',
      sort: true
    },
    {
      label: 'Conta fixa',
      property: 'contaFixa',
      type: 'checkbox',
      disabled: true,
      visible: true,
      align: 'center',
    },
    {
      label: 'Situação',
      property: 'situacao',
      type: 'text',
      visible: true,
      align: 'start',
    },
    {
      label: 'Dt. vencimento',
      property: 'dtConta',
      type: 'text',
      visible: true,
      align: 'center',
    },
    {
      label: 'Dt. pagamento',
      property: 'dtConclusao',
      type: 'text',
      visible: true,
      align: 'center',
    },
    {
      label: 'Dt. Lembrete',
      property: 'dtLembrete',
      type: 'text',
      visible: true,
      align: 'center',
    },
    {
      label: 'Lembrete enviado',
      property: 'lembreteEnviado',
      type: 'checkbox',
      disabled: true,
      visible: true,
      align: 'center',
    },
    {
      label: 'Concluído',
      property: 'concluido',
      type: 'checkbox',
      disabled: true,
      visible: true,
      align: 'center'
    },
    {
      label: 'Tipo de movimentação',
      property: 'tipoMovimentacao',
      type: 'icon',
      visible: true,
      align: 'center',
    },
    {
      label: 'Conta',
      property: 'conta',
      type: 'text',
      visible: true,
      align: 'center',
    },
    {
      label: 'Categoria',
      property: 'categoria',
      type: 'text',
      visible: true,
      align: 'start'
    },
    {
      label: 'Total',
      property: 'total',
      type: 'text',
      visible: true,
      align: 'start'
    },
  ];

  filterFields: IFormField[] = [
    {
      formcontrolname: 'id',
      type: 'number',
      label: 'Id',
    },
    {
      formcontrolname: 'tipoMovimentacao',
      type: 'select',
      label: 'Tipo de movimentação',
      select: {
        data: [],
        valueField: 'id',
        displayField: 'descricao',
        searchField: 'descricao'
      }
    },
    {
      formcontrolname: 'categoria',
      type: 'select',
      label: 'Categoria',
      select: {
        data: [],
        valueField: 'id',
        displayField: 'descricao',
        searchField: 'descricao'
      }
    },
    {
      formcontrolname: 'dtConta',
      type: 'datepicker',
      label: 'Dt. vencimento'
    },
    {
      formcontrolname: 'dtConclusao',
      type: 'datepicker',
      label: 'Dt. pagamento'
    },
    {
      formcontrolname: 'concluido',
      type: 'toggle',
      label: 'Concluído?'
    },
    {
      formcontrolname: 'possuiLembrete',
      type: 'toggle',
      label: 'Possui lembrete?',
    },
    {
      formcontrolname: 'contaFixa',
      type: 'toggle',
      label: 'Conta fixa?',
    },
  ];

}
