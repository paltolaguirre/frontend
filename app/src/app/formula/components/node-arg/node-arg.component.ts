import { Component, OnInit, Input } from '@angular/core';
import { OperatorsService } from 'src/app/core/services/operators/operators.service';

@Component({
  selector: 'app-node-arg',
  templateUrl: './node-arg.component.html',
  styleUrls: ['./node-arg.component.scss']
})
export class NodeArgComponent implements OnInit {
  @Input() formulaParams: any;
  @Input() formulaIsEditable: boolean;
  @Input() formulaIsNew: boolean;

  @Input() type: string;
  @Input() arg: any;
  
  
  constructor(private operatorService: OperatorsService) {}

  ngOnInit() {
  }

  public isAbleToEdit(): boolean {
    if (this.formulaIsNew) {
      return true;
    }

    return this.formulaIsEditable;
  }

  onClickNode(event) {
    if (!this.isAbleToEdit()) {
      return null;
    }

    switch (this.type) {
      case 'number':
        const input = event.target.children[0];
        input.style.display = "block";
        input.focus();   
        break;
      case 'boolean':
        this.arg.Valueboolean = !this.arg.Valueboolean;
        break;
      default:
        break;
    }
  }

  public setDefaultArgValue(arg) {
    // Establece la condicion por defecto de los IFS en "verdadero".
    if (arg.name === 'condicion') {
      arg.Valueboolean = true;
    }
  }

  onDrop(event, currentFormulaValue, paramType='') {
    event.preventDefault();

    if (!this.isAbleToEdit()) {
      return null;
    }

    const data: any /*DataPayload*/ = JSON.parse(event.dataTransfer.getData('text'));

    console.log("Draw onDrop: ", data);
    this.operatorService.emitOperatorDrop(data);

    if(data.payload === undefined) {
      if(paramType == '') {
        event.cancelBubble = true;
        return;
      }
      currentFormulaValue.valueinvoke = data;
      currentFormulaValue.valuenumber = 0;
      return;
    }

    if(data.payload.result != currentFormulaValue.type && data.payload.result != paramType) {
      let message;
      switch (data.payload.result) {
        case 'number':
          message = "Se intenta usar tipo de dato NUMERICO donde se espera BOOLEANO.";
          break;
        case 'boolean':
          message = "Se intenta usar tipo de dato BOOLEANO donde se espera NUMERICO.";
          break;
        default:
          message = "Tipos de datos incompatibles.";
          break;
      }
      
      const warningBox = document.getElementById('warningBox');
      warningBox.innerHTML = `<p>${message}</p>`;
      warningBox.style.display = 'block';
      setTimeout(() => warningBox.style.display = 'none', 3*1000);
      
      event.cancelBubble = true;
      return;
    }

    const args = [];
    data.payload.params.forEach((param, i) => {
      const arg = {
          ID: 0,
          name: param.name,
          type: param.type,
          valuenumber: param.valuenumber == undefined ? 0 : param.valuenumber,
          valuestring: param.valuestring == undefined ? "" : param.valuestring,
          Valueboolean: false,
          valueinvoke: null
      };

      this.setDefaultArgValue(arg);

      args.push(arg);
    });

    const formulaInvoke = {
      ID: 0,
      function: {
        name: data.payload.name,
        params: data.payload.params,
        type: data.payload.type,
        result: data.payload.result
      },
      functionname: data.payload.name,
      args: args
    };

    currentFormulaValue.valueinvoke = formulaInvoke
    event.cancelBubble = true;
  }

/****************************/
  onDragOver(event, id) { // allowDrop
    if (!this.isAbleToEdit()) {
      return null;
    }

    event.preventDefault();

    this.onEnter(event, id);

    event.cancelBubble = true;
  }

  onEnter(e, id) {
    if (!this.isAbleToEdit()) {
      return null;
    }

    const elements = document.querySelectorAll('.highligthed');
    elements.forEach(element => {
      element.classList.replace('highligthed', 'no-highlight');
    });

    const element: HTMLElement = e.target;
    element.classList.replace('no-highlight', 'highligthed');

    this.hideAllRemoveBadges();

    // this.showRemoveBadgeById(id);
  }

  onLeave(e) {
    if (!this.isAbleToEdit()) {
      return null;
    }

    const element: HTMLElement = e.target;
    element.classList.replace('highligthed', 'no-highlight');

    this.hideAllRemoveBadges();
  }

  public hideAllRemoveBadges() {
    const allBadges = Array.from(document.querySelectorAll('.remove-badge-container'));

    for (const badge of allBadges) {
      badge.classList.remove('show');
      badge.classList.add('hide');
    }
  }

  public showRemoveBadgeById(id: string) {
    const removeBadge = document.querySelector(`#value-${id}`);

    if (removeBadge) {
      removeBadge.classList.add('show');
      removeBadge.classList.remove('hide');
    }
  }

  onDragEnter(e, id="") {
    this.onEnter(e, id);
  }

  onDragLeave(e) {
    this.onLeave(e);
  }

  onMouseEnter(e, id="") {
    e.stopPropagation();

    this.onEnter(e, id);
  }

  onMouseLeave(e) {
    e.stopPropagation();

    this.onLeave(e);
  }
/****************************/

  getValue() {
    switch(this.type) {
      case 'number':
        return this.arg.valuenumber;
      case 'boolean':
        return this.arg.Valueboolean ? 'verdadero': 'falso';
      case 'string':
        return this.arg.valuestring;
    }
  }

  valueChanged() {
    console.log("Value: ", this.arg); 
  }

  onBlurInput(event) {
    const input = event.target;
    input.style.display = "none";
  }
}
