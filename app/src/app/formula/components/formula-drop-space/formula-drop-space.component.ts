import { LogicalOperatorNames } from '../../../core/enums/logical-operator-names.enum';
import { OperatorCategory } from '../../../core/enums/operator-category.enum';
import { MathOperatorTypes } from '../../../core/enums/math-operator-types.enum';
import { FormulaTransferData } from '../../../core/models/formula-transfer-data.model';
import { OperatorsService } from '../../../core/services/operators/operators.service';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { takeUntil } from 'rxjs/operators';
import { FormulaService } from '../../../core/services/formula/formula.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-formula-drop-space',
  templateUrl: './formula-drop-space.component.html',
  styleUrls: ['./formula-drop-space.component.scss']
})
export class FormulaDropSpaceComponent implements OnInit, OnDestroy {

  public idCount: number = 0;

  constructor(
    private formulaService: FormulaService,
    private operatorsService: OperatorsService
  ) { }

  ngOnInit() {
    this.formulaService.formulaPickerItemEmitter
    .pipe(
      takeUntil(componentDestroyed(this))
    ).subscribe((payload: FormulaTransferData) => {
      this.handleFormulaItemClicked(payload);
    });

    this.operatorsService.operatorEmitter
      .pipe(
        takeUntil(componentDestroyed(this))
      ).subscribe((data: FormulaTransferData) => {
        if (data.payload.category === OperatorCategory.Logical) {
          return this.handleLogicalOperatorClick(data);
        }

        return this.handleOperatorClicked(data);
    });

    const main = document.getElementById('main') as any;

    main.context = new this.context();
    main.context.origin = null;
    main.context.id = 1;
  }

  ngOnDestroy() {}

  public context() {
    const origin = null;
    const id = 1;
  }

  getStringID() {
    this.idCount ++;

    return String(this.idCount);
  }

  public onDrop(event) {
    event.preventDefault();

    const data: FormulaTransferData = JSON.parse(event.dataTransfer.getData('text'));

    if (data.payload.category === OperatorCategory.Logical) {
      return this.handleLogicalOperatorClick(data);
    }

    if (data.payload.category === OperatorCategory.Math) {
      return this.handleOperatorClicked(data);
    }

    this.createChildElement(data);

    this.onParamMouseOut(event);

    event.cancelBubble = true;
  }

  public createChildElement(data: FormulaTransferData) {
    const domElement = document.getElementById(data.nodeId);
    const droppeableSpace = document.getElementById('main');

    this.appendContent(domElement, droppeableSpace, data);
  }

  public appendContent(origin: HTMLElement, to: HTMLElement, data: FormulaTransferData) {
    if (origin && origin.classList) {
      origin.classList.remove('pronounced');
    }

    const clonedNode = origin.cloneNode(true) as HTMLElement;

    this.addEventToElementParam(clonedNode);

    to.appendChild(clonedNode);

    this.makeRecursiveWhiteParenthesis(clonedNode);

    this.handleOriginNodeDeletion(data);
  }

  public handleOriginNodeDeletion(data: FormulaTransferData) {
    if (data.payload.mustRemoveFromSource) {
      this.removeOrigin(origin);
    }
  }

  public handleFormulaItemClicked(data: FormulaTransferData) {
    this.createChildElement(data);
  }

  public handleOperatorClicked(data: FormulaTransferData) {
    const { payload } = data;

    const formulaDiv = this.createFormula(
      payload.symbol,
      payload.type,
      [MathOperatorTypes.Numeric, MathOperatorTypes.Numeric],
      true,
      true
    );

    if (data) {
      this.renderFormulaInMainContainer(formulaDiv);
    }
  }

  public handleLogicalOperatorClick(data: FormulaTransferData) {
    const { payload } = data;

    if (
      data.payload.operationName === LogicalOperatorNames.And ||
      data.payload.operationName === LogicalOperatorNames.Or ||
      data.payload.operationName === LogicalOperatorNames.Xor
    ) {
      return this.createFormulaWithChildren(data, MathOperatorTypes.Boolean, MathOperatorTypes.Boolean);
    }

    if (data.payload.operationName !== LogicalOperatorNames.If) {
      return this.handleOperatorClicked(data);
    }

    const formulaDiv = this.createFormula(
      payload.symbol,
      payload.type,
      [MathOperatorTypes.Boolean , payload.type, payload.type],
      false,
      false
    );

    const children = formulaDiv.children;
    const aux = document.createElement('div');
    const br1 = document.createElement('br');
    const br2 = document.createElement('br');

    aux.appendChild(formulaDiv);
    br1.innerHTML = br1.innerHTML + 'then';
    br2.innerHTML = br1.innerHTML + 'else ';

    formulaDiv.insertBefore(br1, children[1]);
    formulaDiv.insertBefore(br2, children[3]);

    if (data) {
      this.renderFormulaInMainContainer(formulaDiv);
    }
  }

  public createFormulaWithChildren(
    data: FormulaTransferData,
    parentType: MathOperatorTypes,
    childrenTypes: MathOperatorTypes
  ) {
    const { payload } = data;

    const formulaDiv = this.createFormula(
      payload.symbol,
      parentType,
      [childrenTypes, childrenTypes],
      true,
      true
    );

    this.renderFormulaInMainContainer(formulaDiv);
  }

  public renderFormulaInMainContainer(divFormula) {
    const divmain = document.getElementById('main');

    divmain.appendChild(divFormula);
  }

  public createFormula(
    textContent: string,
    type: MathOperatorTypes,
    arrayParams: MathOperatorTypes[],
    isOperator: boolean,
    isAsoc: boolean
  ) {
    const divFormula = this.createParam(textContent, type, false, isAsoc);

    if (!isOperator) {
      divFormula.innerHTML = textContent;
    }

    for (let index = 0; index < arrayParams.length; index++) {
      if (isOperator && index === 1) {
        divFormula.innerHTML = divFormula.innerHTML + ' ' + textContent + ' ';
      }

      const divParam = this.createParam('', arrayParams[index], true, false);

      divFormula.appendChild(divParam);
    }

    return divFormula;
  }

  public createParam(functionName, type, isDefault, isAsociative) {
    const div = document.createElement('div');
    div.id = this.getStringID();

    div.setAttribute('name', functionName);
    div.setAttribute('data-type', type);
    div.className = 'param ' + this.getClassNameFromOperatorType(type);

    if (isAsociative) {
      div.className = div.className + ' asociative';
    }

    div.draggable = true;

    this.addEventToElementParam(div);

    if (isDefault) {
      if (type === MathOperatorTypes.Numeric) {
        div.innerHTML = '0.00';
      } else if (type === MathOperatorTypes.Boolean) {
        div.innerHTML = 'false';
      }
    }

    return div;
  }

  private getClassNameFromOperatorType(type: MathOperatorTypes) {
    if (type === MathOperatorTypes.Boolean) {
      return 'boolean';
    }

    return 'numeric-param';
  }

  public addEventToElementParam(element) {
    element.onmouseover = this.onParamMouseOver.bind(this);
    element.onmouseout = this.onParamMouseOut.bind(this);
    element.onclick = this.paramOnclickCortarPegar.bind(this);
    element.ondragover = this.onDragOver.bind(this);
    element.ondragstart = this.dragstart.bind(this);
    element.ondrop = this.onChildDrop.bind(this);
    element.ondragleave = this.onParamMouseOut.bind(this);
  }

  onDragOver(event) { // allowDrop
    event.preventDefault();

    this.onParamMouseOver(event);
    // this.onParamMouseOver.call(this, event);

    event.cancelBubble = true;
  }

  onParamMouseOver(e) {
    e.target.classList.remove('no-highlight');
    e.target.classList.add('highligthed');

    e.target.parentNode.classList.remove('highligthed');
    e.target.parentNode.classList.add('no-highlight');

    e.cancelBubble = true;
  }

  onParamMouseOut(e) {
    e.target.classList.remove('highligthed');
    e.target.classList.add('no-highlight');

    e.cancelBubble = true;
  }

  dragstart(ev) {
    ev.dataTransfer.setData('text', ev.target.id); // jsfiddle.net/rodrigomartinvg/vy5928jt/276/#run
    ev.cancelBubble = true;
  }

  public onChildDrop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');

    if (ev.target.parentNode == null) {
      return null;
    }

    this.cutAndPasteDroppedParam(document.getElementById(data), ev.target);

    ev.cancelBubble = true;
  }

  public cutAndPasteDroppedParam(origin, target) {
    if (target === origin) {
      return null;
    }

    this.putChildAndRemoveFromOrigin(origin, target);
  }


  paramOnclickCortarPegar(e) {
    const main = document.getElementById('main') as any;

    if (e.target === main.context.origin) {

      main.context.origin.classList.remove('pronounced');
      main.context.origin = null;

    } else if (main.context.origin == null) {

      if (e.target.children.length === 0 && e.target.getAttribute('name') === '') {

        this.clickEditLiteral(e.target);

      } else {
        main.context.origin = e.target;

        e.target.classList.add('pronounced');
      }

    } else {

      this.putChildAndRemoveFromOrigin(main.context.origin, e.target);

      main.context.origin = null;
    }

    e.cancelBubble = true;
  }

  public clickEditLiteral(target) {
    const input = document.createElement('input') as any;

    if (target.classList.contains('numeric-param')) {
      input.type = 'text';
    } else {
      input.type = 'text';
    }

    input.onexit = (ei) => {
      ei.target.parentNode.innerHTML = ei.target.value;
    };

    input.onblur = input.onexit;

    input.onclick = (ei) => {
      ei.cancelBubble = true;
    };

    input.onmouseover = (ei) => {
      ei.cancelBubble = true;
    };

    input.onmouseout = (ei) => {
      ei.cancelBubble = true;
    };

    input.onkeypress = (ei) => {
    };


    input.className = 'inputedit';

    input.value = target.innerHTML;

    input.style.width = target.innerHTML.length + 'em';

    target.appendChild(input);

    input.focus();
  }

  public putChildAndRemoveFromOrigin(origin: HTMLElement, target: HTMLElement) {
    if (origin.getAttribute('data-type') !== target.getAttribute('data-type')) {
      alert('tipos de datos distintos');
      return;
    }

    origin.classList.remove('pronounced');

    const clonado = origin.cloneNode(true) as HTMLElement;
    clonado.id = this.getStringID();

    this.addEventToElementParam(clonado);

    const aux = document.getElementById('auxiliar');

    aux.appendChild(clonado);

    target.parentNode.replaceChild(clonado, target);

    this.makeRecursiveWhiteParenthesis(clonado);

    if (!origin.contains(clonado)) {
      this.removeOrigin(origin);
    }
  }

  public makeRecursiveWhiteParenthesis(param) {
    if (
      !param.parentNode.classList.contains('param') ||
      !param.parentNode.hasChildNodes()) {
      return null;
    }

    const children = param.parentNode.childNodes;

    for (let i = 0; i < children.length; i++) {
      this.makeWhiteParenthesis(children[i]);
    }

    this.makeWhiteParenthesis(param);
  }

  public makeWhiteParenthesis(param) {
    if (param.nodeName !== 'DIV') {
      return;
    }

    if (
      param.classList.contains('asociative') &&
      param.parentNode.hasChildNodes() &&
      param.getAttribute('name') === param.parentNode.getAttribute('name')
    ) {
      param.classList.add('white-parenthesis');
    } else {
      param.classList.remove('white-parenthesis');
    }
  }

  removeOrigin(origin) {
    if (!origin.parentNode.classList.contains('param')) {
      return origin.remove();
    }

    if (origin.classList.contains('numeric-param')) {
      origin.innerHTML = '0.00';
    } else if (origin.classList.contains('boolean')) {
      origin.innerHTML = 'false';
    } else {
      origin.innerHTML = '';
    }

    origin.classList.remove('pronounced', 'highligthed', 'white-parenthesis', 'asociative');
    this.makeRecursiveWhiteParenthesis(origin);
  }

}
