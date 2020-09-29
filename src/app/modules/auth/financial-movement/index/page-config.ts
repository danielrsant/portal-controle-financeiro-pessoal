import { IFormField } from 'src/app/shared/interfaces/form-filter.interface';
import { TableColumn } from 'src/app/shared/models/table-column.interface';

export class PageConfig {

  columns: TableColumn<any>[] = [
    {
      label: 'Ações',
      property: 'actions',
      type: 'actions',
      visible: true
    },
    {
      label: 'Id',
      property: 'id',
      type: 'text',
      visible: true
    },
    {
      label: 'Descrição',
      property: 'descricao',
      type: 'text',
      visible: true
    },
    {
      label: 'Conta fixa',
      property: 'contaFixa',
      type: 'checkbox',
      visible: true
    },
    {
      label: 'Data de conclusão',
      property: 'dtConclusao',
      type: 'text',
      visible: true,
    },
    {
      label: 'Data de lançamento',
      property: 'dtLancamento',
      type: 'text',
      visible: true,
    },
    {
      label: 'Data de lembrete',
      property: 'dtLembrete',
      type: 'text',
      visible: true,
    },
    {
      label: 'Lembrete enviado',
      property: 'lembreteEnviado',
      type: 'checkbox',
      visible: true,
    },
    {
      label: 'Recebido/Pago',
      property: 'pago',
      type: 'checkbox',
      visible: true
    },
    {
      label: 'Tipo de movimentação',
      property: 'tipoMovimentacao',
      type: 'text',
      visible: true,
    },
    {
      label: 'Categoria',
      property: 'categoria',
      type: 'text',
      visible: true
    },
    {
      label: 'Total',
      property: 'total',
      type: 'text',
      visible: true
    },
  ];

  filterFields: IFormField[] = [
    {
      formcontrolname: 'id',
      type: 'number',
      label: 'Id',
      min: 1
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
      formcontrolname: 'dtLancamento',
      type: 'datepicker',
      label: 'Data de lançamento'
    },
    {
      formcontrolname: 'dtConclusao',
      type: 'datepicker',
      label: 'Data de conclusão'
    },
    {
      formcontrolname: 'pago',
      type: 'toggle',
      label: 'Recebido/Pago?'
    },
    {
      formcontrolname: 'possuiLembrete',
      type: 'toggle',
      label: 'Possui lembrete?'
    },
    {
      formcontrolname: 'contaFixa',
      type: 'toggle',
      label: 'Conta fixa?'
    },
  ];

}
