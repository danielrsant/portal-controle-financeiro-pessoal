export interface IFormField {
    type: string;
    formcontrolname: string;
    label?: string;
    select?: {
      data: any[];
      valueField: string;
      displayField: string;
      searchField: string;
    };
    fxFlex?: string | number;
    min?: number;
    max?: number;
  }