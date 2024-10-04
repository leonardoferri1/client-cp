import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ListaConsorciosPublicosService } from '../../services/lista-consorcios-publicos.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-consorcio',
  templateUrl: './consorcio.component.html',
  styleUrls: ['./consorcio.component.scss'],
})
export class ConsorcioComponent implements OnInit {
  @Input() numeroNovoConsorcio: string = '';
  @Input() consorcioEditData: any;
  consorcio = new ConsorcioPost();

  credoresList: any = [];
  ugList: any = [];
  confirmationModalOpen: boolean = false;

  ugSelected: any[] = [];

  selectedCredor: any;

  nomeConsorcio: string = '';
  documentoNome: string = '';
  valor: number = 0;
  finalidade: string = '';
  documentoFormData = new FormData();
  numeroContratoRateio: string = '';
  isDataEmissaoValid: boolean = true;
  isDataInicioVigenciaValid: boolean = true;
  isDataFimVigenciaValid: boolean = true;

  fileBase64: any;

  private _dataEmissao: Date = new Date();

  get dataEmissao(): Date {
    return this._dataEmissao;
  }

  set dataEmissao(value: Date | string) {
    if (typeof value === 'string') {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        this._dataEmissao = date;
      } else {
        console.error('Invalid date string');
      }
    } else if (value instanceof Date) {
      this._dataEmissao = value;
    } else {
      console.error('Invalid date format');
    }
  }

  private _dataInicioVigencia: any = '';

  get dataInicioVigencia(): any {
    return this._dataInicioVigencia;
  }

  set dataInicioVigencia(value: any) {
    this._dataInicioVigencia = value;
  }

  private _dataFimVigencia: any = '';

  get dataFimVigencia(): any {
    return this._dataFimVigencia;
  }

  set dataFimVigencia(value: any) {
    this._dataFimVigencia = value;
  }

  @Output() consorcioBindData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private listaConsorcioService: ListaConsorciosPublicosService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.populateSelectOptions();
  }

  async editInit() {
    console.log(this.consorcioEditData);
    const credorFind = this.credoresList.find(
      (x: any) => x.credorIdentificacao == this.consorcioEditData.cnpjConsorcio
    );

    this.consorcioEditData.unidadesGestorasIntervenientes.forEach((x: any) => {
      let ugFind = this.ugList.find(
        (y: any) => y.unidadeGestoraCodigo == x.unidadeGestoraInteveniente
      );
      this.ugSelected = [...this.ugSelected, ugFind];
    });
    this.fileBase64 = this.consorcioEditData.arquivoContratoRateio;
    this.nomeConsorcio = this.consorcioEditData.nomeConsorcio;
    this.numeroNovoConsorcio = this.consorcioEditData.numeroConsorcio;
    this.selectedCredor = [credorFind];
    this.documentoNome = this.consorcioEditData.nomeArquivoContratoRateio;
    this.valor = this.consorcioEditData.valor;
    this.finalidade = this.consorcioEditData.finalidade;
    this.numeroContratoRateio = this.consorcioEditData.numeroContratoRateio;
    this.dataInicioVigencia = new Date(
      this.consorcioEditData.dataInicioVigencia
    );
    this.dataFimVigencia = new Date(this.consorcioEditData.dataFimVigencia);
    this.dataEmissao = new Date(this.consorcioEditData.dataEmissao);
  }

  async populateSelectOptions() {
    await this.listaConsorcioService.getUnidadesGestoras().then(
      (data: any) => {
        this.ugList = data;
        console.log(this.ugList);
      },
      (error: any) => {
        console.error(error);
      }
    );

    await this.listaConsorcioService.getCredores().then(
      (data: any) => {
        this.credoresList = data;
        this.credoresList.map(
          (x: any) =>
            (x.nomeCredorIdentificacao =
              x.credorIdentificacao + ' - ' + x.nomeCredorIdentificacao)
        );
        console.log(this.credoresList);
      },
      (error: any) => {
        console.error(error);
      }
    );

    if (this.consorcioEditData) {
      await this.editInit();
    }
  }

  dataEmissaoChange() {}
  dataInicioVigenciaChange() {}
  dataFimVigenciaChange() {}

  clearFormInput(input: string) {
    switch (input) {
      case 'dataEmissao':
        this.dataEmissao = '';
        break;
      case 'dataInicioVigencia':
        this.dataInicioVigencia = '';
        break;
      case 'dataFimVigencia':
        this.dataFimVigencia = '';
        break;
    }
  }

  async tratarDocumento(event: any) {
    const documentoInserido = event.target.files[0];

    if (documentoInserido) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        this.fileBase64 = base64String;
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };

      reader.readAsDataURL(documentoInserido);
    }

    this.documentoFormData.append('file', documentoInserido);
    this.documentoNome = documentoInserido.name;

    event.target.files = [];
  }

  async documentoDelete() {
    this.documentoFormData = new FormData();
    this.documentoNome = '';
  }

  get finalidadeCharacterCount() {
    return 5000 - this.finalidade.length;
  }

  // onInitEditarTratarSessaoInformacoesGerais() {
  //   this.dataEmissao = new Date();
  // }

  cancelConfirmationModalTrigger() {
    this.confirmationModalOpen = true;
  }

  cancelConfirmation(int: number) {
    if (int == 0) {
      this.confirmationModalOpen = false;
    }
    if (int == 1) {
      this.confirmationModalOpen = false;
      this.router.navigateByUrl('/lista-consorcios');
    }
  }

  async salvarConsorcio() {
    if (this.nomeConsorcio.length < 1) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro!',
        detail: 'Inserção do Nome do Consórcio é obrigatória!',
        life: 5000,
      });

      return;
    }

    if (!this.dataEmissao) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro!',
        detail: 'Inserção da Data de Emissão do Consórcio é obrigatória!',
        life: 5000,
      });

      return;
    }

    if (!this.dataInicioVigencia) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro!',
        detail: 'Inserção da Data Início Vigência do Consórcio é obrigatória!',
        life: 5000,
      });

      return;
    }

    if (!this.dataFimVigencia) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro!',
        detail: 'Inserção da Data Fim Vigência do Consórcio é obrigatória!',
        life: 5000,
      });

      return;
    }

    if (!this.selectedCredor) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro!',
        detail: 'Inserção de CNPJ é obrigatória!',
        life: 5000,
      });

      return;
    }

    if (!this.valor) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro!',
        detail: 'Inserção de Valor do Consórcio é obrigatória!',
        life: 5000,
      });

      return;
    }

    if (this.ugSelected.length == 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro!',
        detail: 'Inserção de Unidade Gestora é obrigatória!',
        life: 5000,
      });

      return;
    }

    this.ugSelected.forEach((x: any) => {
      const ug: UnidadesGestorasSelecionadas = {
        id: 0,
        consorcioPublicoId: 0,
        unidadeGestoraInteveniente: x.unidadeGestoraCodigo,
      };

      this.consorcio.unidadesGestorasIntervenientes.push(ug);
    });

    if (this.numeroNovoConsorcio) {
      this.consorcio.numeroConsorcio = this.numeroNovoConsorcio;
    }

    if (this.nomeConsorcio) {
      this.consorcio.nomeConsorcio = this.nomeConsorcio;
    }

    if (this.selectedCredor != undefined) {
      this.selectedCredor = this.selectedCredor[0];
      this.consorcio.cnpjConsorcio = this.selectedCredor.credorIdentificacao;
    }

    if (this.numeroContratoRateio) {
      this.consorcio.numeroContratoRateio = this.numeroContratoRateio;
    }

    if (this.dataInicioVigencia) {
      this.consorcio.dataInicioVigencia = this.dataInicioVigencia.toISOString();
    }

    if (this.dataEmissao) {
      this.consorcio.dataEmissao = this.dataEmissao.toISOString();
    }

    if (this.dataFimVigencia) {
      this.consorcio.dataFimVigencia = this.dataFimVigencia.toISOString();
    }

    if (this.valor) {
      this.consorcio.valor = this.valor;
    }

    if (this.finalidade) {
      this.consorcio.finalidade = this.finalidade;
    }

    if (this.fileBase64) {
      this.consorcio.arquivoContratoRateio = this.fileBase64;
    }

    if (this.documentoNome) {
      this.consorcio.nomeArquivoContratoRateio = this.documentoNome;
    }

    this.consorcioBindData.emit(this.consorcio);
  }

  onSelect(event: any) {
    debugger;
    if (this.selectedCredor.length > 1) {
      this.selectedCredor = [event.itemValue];
    }
  }
}

class ConsorcioPost {
  id: number = 0;
  numeroConsorcio: string = '';
  nomeConsorcio: string = '';
  cnpjConsorcio: string = '';
  numeroContratoRateio: string = '';
  arquivoContratoRateio: string = '';
  nomeArquivoContratoRateio: string = '';
  dataEmissao: string = '';
  dataInicioVigencia: string = '';
  dataFimVigencia: string = '';
  situacao: number = 0;
  valor: number = 0;
  finalidade: string = '';
  unidadesGestorasIntervenientes: UnidadesGestorasSelecionadas[] = [];
}

interface UnidadesGestorasSelecionadas {
  id: number;
  consorcioPublicoId: number;
  unidadeGestoraInteveniente: number;
}

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface MultiSelectObject {
  name: string;
}
