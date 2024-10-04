import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaConsorciosPublicosService } from '../services/lista-consorcios-publicos.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-visualizar-consorcio',
  templateUrl: './visualizar-consorcio.component.html',
  styleUrls: ['./visualizar-consorcio.component.scss'],
})
export class VisualizarConsorcioComponent implements OnInit {
  consorcio: any;
  credoresList: any = [];
  ugList: any = [];

  numeroNovoConsorcio: string = '';
  ugSelected: any[] = [];
  selectedCredor: any;

  nomeConsorcio: string = '';
  documentoNome: string = '';
  valor: number = 0;
  finalidade: string = '';
  numeroContratoRateio: string = '';

  dataEmissao: any;
  dataInicioVigencia: Date = new Date();
  dataFimVigencia: Date = new Date();

  isReadOnly: boolean = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listaConsorcioService: ListaConsorciosPublicosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.populateSelectOptions();
  }

  voltarListagem() {
    this.router.navigateByUrl('/lista-consorcios');
  }

  async populateSelectOptions() {
    await this.listaConsorcioService.getCredores().then(
      (data: any) => {
        this.credoresList = data;
      },
      (error: any) => {
        console.error(error);
      }
    );

    await this.listaConsorcioService.getUnidadesGestoras().then(
      (data: any) => {
        this.ugList = data;
        console.log(this.ugList);
      },
      (error: any) => {
        console.error(error);
      }
    );

    await this.buscaConsorcio();
  }

  async printConsorcio() {
    return this.listaConsorcioService.printConsorcio(
      this.consorcio,
      this.selectedCredor,
      this.ugSelected
    );
  }

  async buscaConsorcio() {
    const consorcioId = this.route.snapshot.paramMap.get('id');

    await this.listaConsorcioService.getConsorcioId(consorcioId).subscribe(
      (data: any) => {
        this.consorcio = data;
        const credorFind = this.credoresList.find(
          (x: any) => x.credorIdentificacao == data.cnpjConsorcio
        );
        credorFind.nomeCredorIdentificacao =
          data.cnpjConsorcio + ' - ' + credorFind.nomeCredorIdentificacao;

        data.unidadesGestorasIntervenientes.forEach((x: any) => {
          let ugFind = this.ugList.find(
            (y: any) => y.unidadeGestoraCodigo == x.unidadeGestoraInteveniente
          );
          this.ugSelected = [...this.ugSelected, ugFind];
        });

        this.nomeConsorcio = data.nomeConsorcio;
        this.numeroNovoConsorcio = data.numeroConsorcio;
        this.selectedCredor = credorFind.nomeCredorIdentificacao;
        this.documentoNome = data.nomeArquivoContratoRateio;
        this.valor = data.valor;
        this.finalidade = data.finalidade;
        this.numeroContratoRateio = data.numeroContratoRateio;
        this.dataInicioVigencia = new Date(data.dataInicioVigencia);
        this.dataFimVigencia = new Date(data.dataFimVigencia);
        this.dataEmissao = new Date(data.dataEmissao);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
