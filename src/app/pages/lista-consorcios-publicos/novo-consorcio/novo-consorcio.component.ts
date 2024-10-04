import { Component, Input, OnInit } from '@angular/core';
import { ListaConsorciosPublicosService } from '../services/lista-consorcios-publicos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-consorcio',
  templateUrl: './novo-consorcio.component.html',
  styleUrls: ['./novo-consorcio.component.scss'],
})
export class NovoConsorcioComponent implements OnInit {
  consorciosList: any = [];
  numeroNovoConsorcio: string = '';
  constructor(
    private listaConsorcioService: ListaConsorciosPublicosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buscaConsorcios();
  }

  async buscaConsorcios() {
    await this.listaConsorcioService.getConsorciosPublicos().then(
      (data: any) => {
        this.consorciosList = data;
        const newestConsorcio = this.findHighestAutoincrement(
          this.consorciosList
        );
        const currentYear: number = new Date().getFullYear();
        if (this.consorciosList.length == 0) {
          this.numeroNovoConsorcio = currentYear + 'CP' + '00001';
        }

        this.numeroNovoConsorcio = this.incrementDocumentId(
          newestConsorcio.numeroConsorcio
        );
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  async postConsorcio(consorcio: any) {
    debugger;
    await this.listaConsorcioService.postConsorcio(consorcio).then(
      (data: any) => {
        console.log(data);

        this.router.navigateByUrl('/lista-consorcios');
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  findHighestAutoincrement(documents: any[]): any | null {
    let maxDocument: any | null = null;
    let maxAutoincrement = -1;

    documents.forEach((doc) => {
      const autoincrementPart = doc.numeroConsorcio.slice(6);
      const autoincrementNumber = parseInt(autoincrementPart);

      if (autoincrementNumber > maxAutoincrement) {
        maxAutoincrement = autoincrementNumber;
        maxDocument = doc;
      }
    });

    return maxDocument;
  }

  incrementDocumentId(consorcioNumero: string): string {
    const yearAndType = consorcioNumero.slice(0, 6);
    const autoincrement = consorcioNumero.slice(6);

    const incrementedNumber = (parseInt(autoincrement) + 1).toString();
    const paddedIncrementedNumber = incrementedNumber.padStart(
      autoincrement.length,
      '0'
    );

    return `${yearAndType}${paddedIncrementedNumber}`;
  }
}
