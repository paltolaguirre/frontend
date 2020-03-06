import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formula-draggable-space',
  templateUrl: './formula-draggable-space.component.html',
  styleUrls: ['./formula-draggable-space.component.scss']
})
export class FormulaDraggableSpaceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getID() {
    const main = document.getElementById("main") as any;

    return (main.context.id++).toString()
  }

  public onDrop(event) {
    event.preventDefault();

    const data = event.dataTransfer.getData('text');

    console.log(data);

    this.ponerInter(document.getElementById(data), event.target);

    this.onParamMouseOut(event);

    event.cancelBubble = true;

  }

  public ponerInter(origin: HTMLElement, to: HTMLElement) {
    origin.classList.remove('marcado');

    const clonedNode = origin.cloneNode(true);

    this.addEventToElementParam(clonedNode);

    to.appendChild(clonedNode);

    this.do_invisiblesparentesis_recursivo(clonedNode);

    this.quitarOrigen(origin);
  }

  public addEventToElementParam(element) {
    element.onmouseover = this.onParamMouseOver;
    element.onmouseout = this.onParamMouseOut;
    element.onclick = this.paramOnclickCortarPegar;
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
    if (ev.target.parentNode == null) {;
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


  paramOnclickCortarPegar(e) {

    const main = document.getElementById('main') as any;

    if (e.target == main.context.origen) {

      main.context.origen.classList.remove('marcado');
      main.context.origen = 'nada';

    } else if (main.context.origen == 'nada') {

      if (e.target.children.length == 0 && e.target.getAttribute('name') == '') {

        this.clickEditLiteral(e.target);

      } else {
        main.context.origen = e.target;

        e.target.classList.add('marcado');
      }

    } else {

      this.ponerYQuitar(main.context.origen, e.target);

      main.context.origen = 'nada';
    }

    e.cancelBubble = true;
  }

  clickEditLiteral(target) {

    const input = document.createElement('input') as any;

    if (target.classList.contains('numeric-param')) {
      input.type = 'text';
    } else {
      input.type = 'text';
    }

    input.onexit = function (ei) {

      ei.target.parentNode.innerHTML = ei.target.value;


    };

    input.onblur = input.onexit;

    input.onclick = function (ei) {

      ei.cancelBubble = true;
    };

    input.onmouseover = function (ei) {

      ei.cancelBubble = true;
    };

    input.onmouseout = function (ei) {

      ei.cancelBubble = true;
    };

    input.onkeypress = function (ei) {

      // e.target.style.width = e.target.value.lenght + "em"
      // console.log(ei.target)
    };


    input.className = 'inputedit';

    input.value = target.innerHTML;

    input.style.width = target.innerHTML.length + 'em';
    // console.log(target.innerHTML.length + "em")

    // e.target.innerHTML = ""

    target.appendChild(input);

    input.focus();

  }

  public ponerYQuitar(origen, destino) {


    if (origen.getAttribute('tipodato') != destino.getAttribute('tipodato')) {
      alert('tipos de de tados distintos');
      return;
    }

    origen.classList.remove('marcado');

    const clonado = origen.cloneNode(true);
    clonado.id = this.getID();

    this.addEventToElementParam(clonado);

    const aux = document.getElementById('auxiliar');

    aux.appendChild(clonado);

    destino.parentNode.replaceChild(clonado, destino);

    this.do_invisiblesparentesis_recursivo(clonado);
    // do_invisiblesparentesis(clonado)

    console.log(!origen.contains(clonado));


    if (!origen.contains(clonado)) {
      this.quitarOrigen(origen);
    }

  }

  do_invisiblesparentesis_recursivo(param) {
    if (param.parentNode.classList.contains('param')) {

      if (param.parentNode.hasChildNodes()) {
        const children = param.parentNode.childNodes;

        for (let i = 0; i < children.length; i++) {
          // console.log(children[i])
          this.do_invisiblesparentesis(children[i]);
        }
        this.do_invisiblesparentesis(param);
        // do_invisiblesparentesis(param.parentNode)
      }

    }

  }

  do_invisiblesparentesis(param) {

    if (param.nodeName != 'DIV') {
      return;
    }


    if (param.classList.contains('asociativo') && param.parentNode.hasChildNodes() && param.getAttribute('name') == param.parentNode.getAttribute('name')) {
      param.classList.add('invisiblesparentesis');
    } else {
      param.classList.remove('invisiblesparentesis');
    }


  }

  quitarOrigen(origen) {

    console.log(!origen.parentNode.classList.contains('param'));

    if (!origen.parentNode.classList.contains('param')) {

      origen.remove();

    } else {

      if (origen.classList.contains('numeric-param')) {
        origen.innerHTML = '0.00';
      } else if (origen.classList.contains('tipobool')) {
        origen.innerHTML = 'false';
      } else {
        origen.innerHTML = '';
      }

      origen.classList.remove('marcado', 'highligthed', 'invisiblesparentesis', 'asociativo');
      this.do_invisiblesparentesis_recursivo(origen);
    }
  }

}
