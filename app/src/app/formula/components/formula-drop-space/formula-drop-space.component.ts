import { InfoDialogComponent } from './../../../shared/components/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LogicalOperatorNames } from '../../../core/enums/logical-operator-names.enum';
import { OperatorCategory } from '../../../core/enums/operator-category.enum';
import { MathOperatorTypes } from '../../../core/enums/math-operator-types.enum';
import { FormulaTransferData } from '../../../core/models/formula-transfer-data.model';
import { OperatorsService } from '../../../core/services/operators/operators.service';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { takeUntil } from 'rxjs/operators';
import { FormulaService } from '../../../core/services/formula/formula.service';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormulaTerm } from 'src/app/core/models/formula-term.model';

@Component({
  selector: 'app-formula-drop-space',
  templateUrl: './formula-drop-space.component.html',
  styleUrls: ['./formula-drop-space.component.scss']
})
export class FormulaDropSpaceComponent implements OnInit, OnDestroy {
  @Output() formulaResultEmitter: EventEmitter<FormulaTerm> = new EventEmitter();
  @Input() isItemPickerExpanded: boolean;

  public idCount: number = 0;
  public formulaResult: FormulaTerm;

  constructor(
    private formulaService: FormulaService,
    private operatorsService: OperatorsService,
    private dialog: MatDialog
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

        return this.handleMathOperatorClicked(data);
      });

    const main = document.getElementById('main') as any;

    main.context = new this.context();
    main.context.origin = null;
    main.context.id = 1;
  }

  ngOnDestroy() {
  }

  public context() {
    const origin = null;
    const id = 1;
  }

  public getNewID() {
    this.idCount++;

    return String(this.idCount);
  }

  public onDrop(event) {
    event.preventDefault();

    const data: FormulaTransferData = JSON.parse(event.dataTransfer.getData('text'));

    if (data.payload.category === OperatorCategory.Logical) {
      return this.handleLogicalOperatorClick(data);
    }

    if (data.payload.category === OperatorCategory.Math) {
      return this.handleMathOperatorClicked(data);
    }

    this.createDomElementWithoutChildren(data, false);

    this.onDragLeave(event);

    event.cancelBubble = true;
  }

  public createDomElementWithoutChildren(data: FormulaTransferData, isInput: boolean) {
    const domElement = document.getElementById(data.nodeId);
    const droppeableSpace = document.getElementById('main');

    this.appendContent(domElement, droppeableSpace, data, isInput);

    this.updateFormulaTerms();
  }

  public appendContent(origin: HTMLElement, to: HTMLElement, data: FormulaTransferData, isInput: boolean) {
    if (origin && origin.classList) {
      origin.classList.remove('pronounced');
    }

    const clonedNode = origin.cloneNode(true) as HTMLElement;
    // Generates a new ID to avoid deleting the original operator from the toolbar.
    clonedNode.id = this.getNewID();

    if (isInput) {
      clonedNode.innerHTML = '0.00';
      this.editCurrentElement(clonedNode);
    }

    this.addEventsToFormulaParam(clonedNode);

    to.appendChild(clonedNode);

    this.makeRecursiveWhiteParenthesis(clonedNode);

    this.handleOriginNodeDeletion(data);
  }

  private createRemoveIcon(): HTMLElement {
    const badge = document.createElement('div');
    badge.classList.add('remove-badge-container');
    badge.classList.add('no-selectable');
    badge.setAttribute('draggable', 'false');

    const removeIcon = document.createElement('i');
    removeIcon.classList.add('remove-icon');
    removeIcon.classList.add('no-selectable');
    removeIcon.classList.add('fas');
    removeIcon.classList.add('fa-trash-alt');

    badge.append(removeIcon);

    badge.onclick = (e: any) => {
      const param = e.path.find((node) => node.classList.contains('param'));

      if (param) {
        param.remove();

        this.updateFormulaTerms();
      }
    };

    return badge;
  }

  public handleOriginNodeDeletion(data: FormulaTransferData) {
    if (data.payload.mustRemoveFromSource) {
      this.removeOrigin(origin);
    }
  }

  public handleFormulaItemClicked(data: FormulaTransferData) {
    this.createDomElementWithoutChildren(data, false);
  }

  public handleMathOperatorClicked(data: FormulaTransferData) {
    const { payload } = data;

    if (!payload.hasChildren) {
      return this.createDomElementWithoutChildren(data, true);
    }

    const formulaDiv = this.createFormula(
      data,
      payload.symbol,
      payload.type,
      [MathOperatorTypes.Numeric, MathOperatorTypes.Numeric],
      true,
      true
    );

    this.renderFormulaInMainContainer(formulaDiv);
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
      return this.handleMathOperatorClicked(data);
    }

    const formulaDiv = this.createFormula(
      data,
      payload.symbol,
      payload.type,
      [MathOperatorTypes.Boolean, payload.type, payload.type],
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

    this.renderFormulaInMainContainer(formulaDiv);
  }

  public createFormulaWithChildren(
    data: FormulaTransferData,
    parentType: MathOperatorTypes,
    childrenTypes: MathOperatorTypes
  ) {
    const { payload } = data;

    const formulaDiv = this.createFormula(
      data,
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
    data: FormulaTransferData,
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

    divFormula.setAttribute('id', `formula-term-${data.nodeId}`);
    divFormula.setAttribute('data-data', JSON.stringify(data));

    this.updateFormulaTerms();

    return divFormula;
  }

  public createParam(functionName, type, isDefault, isAsociative) {
    const div = document.createElement('div');
    div.id = this.getNewID();

    div.setAttribute('name', functionName);
    div.setAttribute('data-type', type);
    div.setAttribute('id', `child-param-${this.getNewID()}`);
    div.className = 'param ' + this.getClassNameFromOperatorType(type);

    if (isAsociative) {
      div.className = div.className + ' asociative';
    }

    div.draggable = true;

    this.addEventsToFormulaParam(div);

    if (!isDefault) {
      return div;
    }

    if (type === MathOperatorTypes.Numeric) {
      div.innerHTML = '0.00';
    } else if (type === MathOperatorTypes.Boolean) {
      div.innerHTML = 'false';
    }

    const formulaTermData: FormulaTerm = {
      nodeId: div.id,
      payload: div.innerHTML,
      children: null
    };

    div.setAttribute('data-data', JSON.stringify(formulaTermData));

    return div;
  }

  private getClassNameFromOperatorType(type: MathOperatorTypes) {
    if (type === MathOperatorTypes.Boolean) {
      return 'boolean';
    }

    return 'numeric-param';
  }

  public addEventsToFormulaParam(element) {
    element.onmouseover = this.onParamMouseOver.bind(this);
    element.onmouseout = this.onDragLeave.bind(this);
    element.onclick = this.cutAndPasteOnClick.bind(this);
    element.ondragover = this.onDragOver.bind(this);
    element.ondragstart = this.dragstart.bind(this);
    element.ondrop = this.onChildDrop.bind(this);
    element.ondragleave = this.onDragLeave.bind(this);
  }

  public onDragOver(event) { // allowDrop
    event.preventDefault();

    this.onParamMouseOver(event);

    event.cancelBubble = true;
  }

  public onParamMouseOver(e) {
    e.stopPropagation();

    this.highlightElement(e.target);

    this.addRemoveIcon(e);

    this.removeHighlightToElement(e.target.parentNode);

    e.cancelBubble = true;
  }

  public onDragLeave(e) {
    this.removeHighlightToElement(e.target);

    this.removeTrashIcon(e);

    e.cancelBubble = true;
  }

  public addRemoveIcon(e) {
    // e.stopPropagation();
    if (e.toElement.classList.contains('remove-badge-container')) {
      return null;
    }

    if (e.target.classList && e.target.classList.contains('asociative')) {
      if (e.target.querySelector('.remove-badge-container') || e.toElement.querySelector('.remove-badge-container')) {
        return null;
      }

      const removeIcon = this.createRemoveIcon();
      e.target.appendChild(removeIcon);
    }

    e.cancelBubble = true;
  }

  public removeTrashIcon(e) {
    e.stopPropagation();

    // When the mouse enters into the trash icon, we don't remove it.
    if (e.toElement.classList.contains('remove-badge-container')) {
      return null;
    }

    // TODO: fix that
    // if (!e.toElement.classList.contains('asociative')) {
    // console.log('saliste afuera del operador');
    // console.log('el target es: ', e.target);
    // if (e.target.querySelector('.remove-badge-container')) {
    //   e.target.querySelector('.remove-badge-container').remove();
    // }

    // return null;
    // }

    // If the hover is on the asociative param, we don't remove the trash icon.
    if (e.target.parentNode.classList.contains('asociative')) {
      return null;
    }

    const removeBadge = e.target.querySelector('.remove-badge-container');

    if (removeBadge) {
      removeBadge.remove();
    }
  }

  public removeHighlightToElement(target: HTMLElement) {
    target.classList.remove('highligthed');
    target.classList.add('no-highlight');
  }

  public highlightElement(target: HTMLElement) {
    target.classList.remove('no-highlight');
    target.classList.add('highligthed');
  }

  dragstart(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
    ev.cancelBubble = true;
  }

  public onChildDrop(ev) {
    ev.preventDefault();
    const draggedNodeId = ev.dataTransfer.getData('text');

    if (ev.target.parentNode == null) {
      return null;
    }

    const origin = document.getElementById(draggedNodeId);
    const target = ev.target;

    this.cutAndPasteDroppedParam(origin, target);

    this.updateFormulaTerms();

    ev.cancelBubble = true;
  }

  public cutAndPasteDroppedParam(origin, target) {
    if (target === origin) {
      return null;
    }

    this.putChildAndRemoveFromOrigin(origin, target);
  }

  public cutAndPasteOnClick(e) {
    const main = document.getElementById('main') as any;

    if (e.target.classList.contains('editable-input')) {
      return this.editCurrentElement(e.target);
    }

    if (e.target === main.context.origin) {
      main.context.origin.classList.remove('pronounced');
      main.context.origin = null;

    } else if (main.context.origin == null) {
      if (e.target.children.length === 0 && e.target.getAttribute('name') === '') {
        this.editCurrentElement(e.target);

      } else {
        main.context.origin = e.target;

        e.target.classList.add('pronounced');
      }
    } else {
      // Feature to move items inside others only clicking on them
      // this.putChildAndRemoveFromOrigin(main.context.origin, e.target);

      main.context.origin = null;
    }

    e.cancelBubble = true;
  }

  public editCurrentElement(inputParamContainerTarget) {
    const input = document.createElement('input') as any;

    if (inputParamContainerTarget.classList.contains('numeric-param')) {
      input.type = 'number';
    } else {
      input.type = 'text';
    }

    input.setAttribute('id', `input-${this.getNewID()}`);

    input.onexit = (event) => {
      const targetValue = event.target.value;

      event.target.parentNode.innerHTML = targetValue;

      this.updateInputContainerData(inputParamContainerTarget, targetValue);

      this.updateFormulaTerms();
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
      if (ei.keyCode === 13) { // Enter
        input.blur();
      }
    };

    input.className = 'inputedit';
    input.placeholder = Number(inputParamContainerTarget.getAttribute('data-type')) === MathOperatorTypes.Boolean ?
      'false' :
      '0.00';
    input.style.width = '3rem';

    inputParamContainerTarget.appendChild(input);

    setTimeout(() => input.focus());
  }

  private updateInputContainerData(node: HTMLElement, newValue: any) {
    const data: FormulaTerm = {
      nodeId: node.getAttribute('id'),
      payload: newValue,
      children: null
    };

    node.setAttribute('data-data', JSON.stringify(data));
  }

  public putChildAndRemoveFromOrigin(origin: HTMLElement, target: HTMLElement) {
    if (origin.getAttribute('data-type') !== target.getAttribute('data-type')) {
      return this.dialog.open(InfoDialogComponent, {
        width: '250px',
        data: {
          title: 'Tipos de datos distintos',
          text: 'Por favor, intente nuevamente con operadores del mismo tipo. Ejemplo: numérico con numérico.'
        }
      });
    }

    if (origin.classList) {
      origin.classList.remove('pronounced');
    }

    const clonedNode = origin.cloneNode(true) as HTMLElement;
    clonedNode.id = this.getNewID();

    this.addEventsToFormulaParam(clonedNode);

    const aux = document.getElementById('auxiliar');

    aux.appendChild(clonedNode);

    target.parentNode.replaceChild(clonedNode, target);

    this.makeRecursiveWhiteParenthesis(clonedNode);

    if (!origin.contains(clonedNode)) {
      this.removeOrigin(origin);
    }
  }

  public makeRecursiveWhiteParenthesis(param) {
    if (
      !param.parentNode.classList ||
      !param.parentNode.classList.contains('param') ||
      !param.parentNode.hasChildNodes()) {
      return null;
    }

    const children = param.parentNode.childNodes;

    for (const child of children) {
      this.makeWhiteParenthesis(child);
    }

    this.makeWhiteParenthesis(param);
  }

  public makeWhiteParenthesis(param) {
    if (param.nodeName !== 'DIV') {
      return;
    }

    if (
      param.classList &&
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
    if (!origin.parentNode.classList || !origin.parentNode.classList.contains('param')) {
      return origin.remove();
    }

    if (origin.classList && origin.classList.contains('numeric-param')) {
      origin.innerHTML = '0.00';
    } else if (origin.classList && origin.classList.contains('boolean')) {
      origin.innerHTML = 'false';
    } else {
      origin.innerHTML = '';
    }

    if (origin.classList) {
      origin.classList.remove('pronounced', 'highligthed', 'white-parenthesis', 'asociative');
    }

    this.makeRecursiveWhiteParenthesis(origin);
  }

  public updateFormulaTerms() {
    const mainDropSpace = document.querySelector('#main') as HTMLElement;

    setTimeout(() => {
      if (!mainDropSpace.childNodes || mainDropSpace.childNodes.length <= 0) {
        return null;
      }

      const mainChildrenNodes = Array.from(mainDropSpace.childNodes) as HTMLElement[];

      this.formulaResult = this.getChildrenFormulaTermsFromNode(mainChildrenNodes[0]);

      // console.log('formula: ', this.formulaResult);
      this.formulaResultEmitter.emit(this.formulaResult);
    }, 500);
  }

  public getChildrenFormulaTermsFromNode(node: HTMLElement): FormulaTerm {
    // Get child nodes and filter them by formula params.
    const childNodes = Array.from(node.childNodes) as HTMLElement[];

    // Filter nodes which are relevant for the formula terms array.
    const filteredNodes = childNodes.filter((child) => {
      return this.isParam(child);
    });

    const childTerms: FormulaTerm[] = [];

    if (!filteredNodes) {
      return null;
    }

    for (const filteredNode of filteredNodes) {
      const childNodesArray = Array.from(filteredNode.childNodes).filter((childNode: HTMLElement) => {
        return this.isParam(childNode);
      });

      childTerms.push({
        nodeId: filteredNode.id,
        payload: filteredNode.getAttribute('data-data') ?
          JSON.parse((filteredNode.getAttribute('data-data'))) :
          node.innerText,
        children: childNodesArray.map((childNode: HTMLElement) => {
          return this.getChildrenFormulaTermsFromNode(childNode);
        })
      });
    }

    return {
      nodeId: node.id,
      payload: node.getAttribute && node.getAttribute('data-data') ?
        JSON.parse((node.getAttribute('data-data'))) :
        node.innerText,
      children: childTerms
    };
  }

  public isParam(node: HTMLElement): boolean {
    return node.id && node.classList && node.classList.contains('param');
  }
}
