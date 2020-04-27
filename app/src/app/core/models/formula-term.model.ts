export class FormulaTerm {
  nodeId: string;
  payload: any; // Puede ser un operador, una formula, una variable; puede tener diferentes datos.
  children?: FormulaTerm[] | any[];
  //type
}
