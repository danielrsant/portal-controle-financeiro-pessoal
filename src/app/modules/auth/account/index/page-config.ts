import { IFormField } from 'src/app/shared/interfaces/form-filter.interface';
import { TableColumn } from 'src/app/shared/models/table-column.interface';

export class PageConfig {

  columns: TableColumn<any>[] = [
    {
      label: 'Ações',
      property: 'actions',
      type: 'actions',
      visible: true,
      align: 'start',
    },
    {
      label: 'Id',
      property: 'id',
      type: 'text',
      visible: true,
      align: 'start',
    },
    {
      label: 'Descrição',
      property: 'descricao',
      type: 'text',
      visible: true,
      align: 'start',
    },
    {
      label: 'Tipo da conta',
      property: 'tipoConta',
      type: 'text',
      visible: true,
      align: 'start',
    },
    {
      label: 'Instituição financeira',
      property: 'instituicaoFinanceira',
      type: 'text',
      visible: true,
      align: 'start',
    },
    {
      label: 'Status',
      property: 'status',
      type: 'checkbox',
      disabled: true,
      visible: true,
      align: 'start',
    },
  ];

  filterFields: IFormField[] = [
    {
      formcontrolname: 'id',
      type: 'number',
      label: 'Id',
      fxFlex: '30'
    },
    {
      formcontrolname: 'descricao',
      type: 'text',
      label: 'Descrição',
      fxFlex: '60'
    },
    {
      formcontrolname: 'status',
      type: 'toggle',
      label: 'Ativo?',
    },
  ];

}
