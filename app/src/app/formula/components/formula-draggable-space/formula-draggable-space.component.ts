import { FormulaTransferData } from './../../../core/models/formula-transfer-data.model';
import { OperatorsService } from './../../../core/services/operators/operators.service';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { takeUntil } from 'rxjs/operators';
import { FormulaService } from './../../../core/services/formula/formula.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-formula-draggable-space',
  templateUrl: './formula-draggable-space.component.html',
  styleUrls: ['./formula-draggable-space.component.scss']
})
export class FormulaDraggableSpaceComponent implements OnInit, OnDestroy {

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
      ).subscribe((payload: FormulaTransferData) => {
        this.handleOperatorClicked(payload);
    });
  }

  ngOnDestroy() {}

  getID() {
    const main = document.getElementById('main') as any;

    return (main.context.id++).toString();
  }

  public onDrop(event) {
    event.preventDefault();

    const data: FormulaTransferData = JSON.parse(event.dataTransfer.getData('text'));

    this.createChildElement(data);

    this.onParamMouseOut(event);

    event.cancelBubble = true;
  }

  public createChildElement(data: FormulaTransferData) {
    const domElement = document.getElementById(data.nodeId);
    const droppeableSpace = document.getElementById('main');

    console.log('payload:', data.payload);

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
    const { nodeId, payload } = data;

    console.log(nodeId);
    console.log(payload);
  }

  public createFormula(nameFunction, tipoReturn, arrayParams, isOperator, isAsoc) {
    const divFormula = this.createParam(nameFunction, tipoReturn, false, isAsoc);

    if (!isOperator) {
      divFormula.innerHTML = nameFunction;
    }

    for (let index = 0; index < arrayParams.length; index++) {
      if (isOperator && index === 1) {
        divFormula.innerHTML = divFormula.innerHTML + ' ' + nameFunction + ' ';
      }

      const divParam = this.createParam('', arrayParams[index], true, false);

      divFormula.appendChild(divParam);
    }

    return divFormula;
  }

  public createParam(functionName, type, isDefault, isAsociative) {
    const div = document.createElement('div');
    div.id = this.getID();

    div.setAttribute('name', functionName);
    div.setAttribute('tipodato', type);
    div.className = 'param ' + type;

    if (isAsociative) {
      div.className = div.className + ' asociativo';
    }

    div.draggable = true;

    this.addEventToElementParam(div);

    if (isDefault) {
      if (type === 'numeric') {
        div.innerHTML = '0.00';
      } else if (type === 'bool') {
        div.innerHTML = 'false';
      }
    }

    return div;
  }

  public addEventToElementParam(element) {
    element.onmouseover = this.onParamMouseOver;
    element.onmouseout = this.onParamMouseOut;
    // element.onclick = this.paramOnclickCortarPegar;
    element.ondragover = this.onDragOver;
    element.ondragstart = this.dragstart;
    element.ondrop = this.drop;
    element.ondragleave = this.onParamMouseOut;
  }

  onDragOver(event) { // allowDrop
    event.preventDefault();

    this.onParamMouseOver(event);

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

  drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');

    // console.log(document.getElementById(data))
    if (ev.target.parentNode == null) {
      return null;
    }

    this.paramDragDropCortarPegar(document.getElementById(data), ev.target);

    ev.cancelBubble = true;
  }

  paramDragDropCortarPegar(origen, target) {

    if (target == origen) {

      return;

    } else {

      this.ponerYQuitar(origen, target);

    }
  }


  // paramOnclickCortarPegar(e) {

  //   const main = document.getElementById('main') as any;

  //   if (e.target == main.context.origen) {

  //     main.context.origen.classList.remove('pronounced');
  //     main.context.origen = null;

  //   } else if (main.context.origen == null) {

  //     if (e.target.children.length == 0 && e.target.getAttribute('name') == '') {

  //       this.clickEditLiteral(e.target);

  //     } else {
  //       main.context.origen = e.target;

  //       e.target.classList.add('pronounced');
  //     }

  //   } else {

  //     this.ponerYQuitar(main.context.origen, e.target);

  //     main.context.origen = null;
  //   }

  //   e.cancelBubble = true;
  // }

  clickEditLiteral(target) {
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

  public ponerYQuitar(origen, destino) {


    if (origen.getAttribute('data-type') !== destino.getAttribute('data-type')) {
      alert('tipos de de tados distintos');
      return;
    }

    origen.classList.remove('pronounced');

    const clonado = origen.cloneNode(true);
    clonado.id = this.getID();

    this.addEventToElementParam(clonado);

    const aux = document.getElementById('auxiliar');

    aux.appendChild(clonado);

    destino.parentNode.replaceChild(clonado, destino);

    this.makeRecursiveWhiteParenthesis(clonado);

    if (!origen.contains(clonado)) {
      this.removeOrigin(origen);
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
      param.classList.contains('asociativo') &&
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
    } else if (origin.classList.contains('tipobool')) {
      origin.innerHTML = 'false';
    } else {
      origin.innerHTML = '';
    }

    origin.classList.remove('pronounced', 'highligthed', 'white-parenthesis', 'asociativo');
    this.makeRecursiveWhiteParenthesis(origin);
  }

}
