import { Component, OnInit, ViewChild } from '@angular/core';
import { MasksService } from '../../shared/services/masks.service';
import { Router } from '@angular/router';
import { ListaConsorciosPublicosService } from './services/lista-consorcios-publicos.service';

@Component({
  selector: 'app-lista-consorcios-publicos',
  templateUrl: './lista-consorcios-publicos.component.html',
  styleUrls: ['./lista-consorcios-publicos.component.scss'],
})
export class ListaConsorciosPublicosComponent implements OnInit {
  consorcioList: any = [];
  filteredConsorcioList: any = [];
  sidebarOpen: boolean = false;
  nomeConsorcio: string = '';
  cnpjInput: string = '';
  appliedFilters: string[] = [];

  @ViewChild('dt') dt: any; // This references your p-table

  constructor(
    private masksService: MasksService,
    private router: Router,
    private listaConsorcioService: ListaConsorciosPublicosService
  ) {}

  ngOnInit() {
    this.buscaConsorcios();
  }

  formatarData(value: string): string {
    return this.masksService.formatarData(value);
  }

  formatarMoeda(value: any): any {
    let formattedString = this.masksService.formatarMoeda(value);
    return formattedString.replace(/R\$+/g, '');
  }

  redirectNovo(url: string) {
    this.router.navigateByUrl(url);
  }

  async reloadPage() {
    await this.buscaConsorcios();
  }

  async buscaConsorcios() {
    await this.listaConsorcioService.getConsorciosPublicos().then(
      (data: any) => {
        this.consorcioList = data;
        this.filteredConsorcioList = data;
        console.log(this.filteredConsorcioList);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  openSideBar() {
    this.sidebarOpen = true;
  }

  redirectTo(url: string, id: any) {
    let finalUrl;
    let stringId = id.toString();

    finalUrl = url + '/' + stringId;

    if (id) {
      this.router.navigateByUrl(finalUrl);
    } else if (!id) {
      this.router.navigateByUrl(url);
    }
  }

  onInputChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const sanitizedValue = this.sanitizeInteressadoInput(inputValue);
    inputElement.value = sanitizedValue;
  }

  sanitizeInteressadoInput(input: string): string {
    const sanitizedInput = input.replace(/[^\w\sÀ-ÖØ-öø-ÿ]/g, '');
    return sanitizedInput;
  }

  cleanFilters() {
    this.nomeConsorcio = '';
    this.cnpjInput = '';
  }

  filterConsorcios() {
    this.appliedFilters = [];
    this.onDataChanged();

    let newFilteredList = this.consorcioList;

    if (this.cnpjInput) {
      newFilteredList = newFilteredList.filter((consorcio: any) =>
        consorcio.cnpjConsorcio
          .toLowerCase()
          .includes(this.cnpjInput.toLowerCase())
      );

      this.appliedFilters.push(this.cnpjInput);
    }

    if (this.nomeConsorcio) {
      newFilteredList = newFilteredList.filter((consorcio: any) =>
        consorcio.nomeConsorcio
          .toLowerCase()
          .includes(this.nomeConsorcio.toLowerCase())
      );

      this.appliedFilters.push(this.cnpjInput);
    }

    this.filteredConsorcioList = newFilteredList;
  }

  onDataChanged() {
    this.dt.first = 0;
  }
}
