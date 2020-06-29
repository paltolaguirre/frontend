import { Injectable } from '@angular/core';
import { DataPayload } from '../components/formula-draw/formula-draw.component';
import { OperatorsService } from 'src/app/core/services/operators/operators.service';

@Injectable({
  providedIn: 'root'
})
export class EventHandlerService {
  public dragging = false;

  constructor(private operatorService: OperatorsService) { }

  private invokeRemuve(currentFormulaValue) {
    currentFormulaValue.valueinvokeid = null;
    currentFormulaValue.valueinvoke = null;
    currentFormulaValue.valuenumber = 0;
  }

  private bracketHelperRight(formulaInvoke: any, currentFormulaValue: any) {
    this.bracketHelper(formulaInvoke, currentFormulaValue, 0);
  }

  private bracketHelperLeft(formulaInvoke: any, currentFormulaValue: any) {
    this.bracketHelper(formulaInvoke, currentFormulaValue, 1);
  }

  private bracketHelper(formulaInvoke: any, currentFormulaValue: any, index: number) {
    if(formulaInvoke.args.length == 2) {
      formulaInvoke.args[index].valueinvoke = currentFormulaValue.valueinvoke;
      if (!formulaInvoke.args[index].valueinvoke) {
        formulaInvoke.args[index].valuenumber = currentFormulaValue.valuenumber;
        formulaInvoke.args[index].valuestring = currentFormulaValue.valuestring;
        formulaInvoke.args[index].Valueboolean = currentFormulaValue.Valueboolean;
      }
      currentFormulaValue.valueinvoke = formulaInvoke;
    }
  }

  public onClickNode(event, isAbleToEdit: boolean, type='number', arg=null) {
    if (!isAbleToEdit) {
      return null;
    }

    switch (type) {
      case 'number':
        const input = event.target.children[0];
        input.style.display = "block";
        input.focus();   
        break;
      case 'boolean':
        arg.Valueboolean = !arg.Valueboolean;
        break;
      default:
        break;
    }
  }

  public onBlurInput(event) {
    const input = event.target;
    input.style.display = "none";
  }

  public onEnter(e, isAbleToEdit: boolean) {
    if (!isAbleToEdit) {
      return null;
    }

    const elements = document.querySelectorAll('.highligthed');
    elements.forEach(element => {
      element.classList.replace('highligthed', 'no-highlight');
      element.classList.remove('bracket-left');
      element.classList.remove('bracket-right');
    });

    const element: HTMLElement = e.target;
    element.classList.replace('no-highlight', 'highligthed');

    //this.hideAllRemoveBadges();

    // this.showRemoveBadgeById(id);
  }

  public onLeave(event, isAbleToEdit: boolean) {
    if (!isAbleToEdit) {
      return null;
    }

    const element: HTMLElement = event.target;
    element.classList.replace('highligthed', 'no-highlight');
    element.classList.remove('bracket-left');
    element.classList.remove('bracket-right');
    // this.hideAllRemoveBadges();
  }

  public onDragOver(e, isAbleToEdit: boolean) {
    const width = 16;

    if (!isAbleToEdit || e.target.tagName == 'APP-NODE-ARG' || this.dragging /* si se esta arrastrando desde el lienzo */) {
      return null;
    }

    const rect = e.target.getBoundingClientRect()
    const xstart = rect.left;
    const xend = rect.left + rect.width;
    const ystart = rect.top;
    const yend = rect.top + rect.height;
    const element: HTMLElement = e.target;

    if(e.x > xstart && e.x < xstart+width) {
      element.classList.add('bracket-left');
    } else if(e.x > xend-width && e.x < xend) {
      element.classList.add('bracket-right');
    } else {
      element.classList.remove('bracket-left');
      element.classList.remove('bracket-right');
    }
  }

  public onDrop(event, currentFormulaValue, paramType='', isAbleToEdit: boolean) {
    event.preventDefault();

    if(!isAbleToEdit || !event.target.classList.contains('highligthed')) {
      return null;
    }

    const data: any /*DataPayload*/ = JSON.parse(event.dataTransfer.getData('text'));

    // console.log("Draw onDrop: ", data);
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

    const isOperator = formulaInvoke.function.type == 'operator';
    if(isOperator && event.target.classList.contains('bracket-left')) {
      this.bracketHelperLeft(formulaInvoke, currentFormulaValue);
    } else if(isOperator && event.target.classList.contains('bracket-right')) {
      this.bracketHelperRight(formulaInvoke, currentFormulaValue);
    } else {
      currentFormulaValue.valueinvoke = formulaInvoke;
    }

    event.cancelBubble = true;
  }

  public setDefaultArgValue(arg) {
    // Establece la condicion por defecto de los IFS en "verdadero".
    if (arg.name === 'condicion') {
      arg.Valueboolean = true;
    }
  }

  public onDrag(event, currentFormulaValue, isAbleToEdit: boolean) {
    if (!isAbleToEdit) {
      return null;
    }
    this.dragging = true;

    event.dataTransfer.setData('text', JSON.stringify(currentFormulaValue.valueinvoke));
    event.cancelBubble = true;
  }

  public onDragEnd(event, currentFormulaValue, isAbleToEdit: boolean) {
    if (!isAbleToEdit) {
      return null;
    }
    this.dragging = false;

    // console.log("Draw onDragEnd: ", event);
    const rect = document.getElementById('main').getBoundingClientRect();
    const xstart = rect.left;
    const xend = rect.left + rect.width;
    const ystart = rect.top;
    const yend = rect.top + rect.height;

    if(event.x > xstart && event.x < xend && event.y > ystart && event.y < yend) {
      this.invokeRemuve(currentFormulaValue);
    }
    event.cancelBubble = true;
  }
}
