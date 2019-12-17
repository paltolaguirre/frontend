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
      /* (canvas.width*pageHeight)/imgWidth */
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  

      const imgData = canvas.toDataURL('image/png')  
      let doc = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      //var doc = new jspdf('p', 'mm');
      var position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save('print.pdf'); // Generated PDF   
    });  
  }  
}
