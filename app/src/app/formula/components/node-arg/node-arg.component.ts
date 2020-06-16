import { Component, OnInit, Input } from '@angular/core';
import { OperatorsService } from 'src/app/core/services/operators/operators.service';
import { EventHandlerService } from '../../services/event-handler.service';

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
  
  constructor(private operatorService: OperatorsService, private eventHandlerService: EventHandlerService) {}

  ngOnInit() {
  }

  public isAbleToEdit(): boolean {
    if (this.formulaIsNew) {
      return true;
    }

    return this.formulaIsEditable;
  }

  onClickNode(event) {
    this.eventHandlerService.onClickNode(event, this.isAbleToEdit(), this.type, this.arg);
  }

  public setDefaultArgValue(arg) {
    // Establece la condicion por defecto de los IFS en "verdadero".
    if (arg.name === 'condicion') {
      arg.Valueboolean = true;
    }
  }

  onDrop(event, currentFormulaValue, paramType='') {
    this.eventHandlerService.onDrop(event, currentFormulaValue, paramType, this.isAbleToEdit());
  }

/****************************/
  onDragOver(event, id) { // allowDrop
    this.eventHandlerService.onDragOver(event, this.isAbleToEdit());
/*
    if (!this.isAbleToEdit()) {
      return null;
    }

    event.preventDefault();

    this.onEnter(event, id);

    event.cancelBubble = true;
*/
  }

  onEnter(e, id) {
    this.eventHandlerService.onEnter(e, this.isAbleToEdit());
  }

  onLeave(e) {
    this.eventHandlerService.onLeave(e, this.isAbleToEdit());
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
    this.eventHandlerService.onBlurInput(event);
  }
}
