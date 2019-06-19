import { Injectable } from '@angular/core';
import { Component, OnInit, ElementRef ,ViewChild} from '@angular/core';  
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  
  constructor() { }

  public printTOPDF() 
  {  
    var data = document.getElementById('contentTOPDF');  
   /* 
    var elements = data.getElementsByClassName('Acciones');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }*/

    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('print.pdf'); // Generated PDF   
    });  
  }  
}
