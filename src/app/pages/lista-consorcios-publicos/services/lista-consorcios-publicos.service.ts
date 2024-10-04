import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { getPdfHeader } from '../../../helpers/getPdfHeader';
import { MasksService } from '../../../shared/services/masks.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class ListaConsorciosPublicosService {
  private apiUrl = environment().apiUrl;

  constructor(private http: HttpClient, readonly maskService: MasksService) {}

  async getUnidadesGestoras(): Promise<any> {
    const queryParameter = this.apiUrl + `/ExternalApi/GetUnidadesGestoras`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const returned = this.http.get<any>(queryParameter, { headers });

    return await returned.toPromise();
  }

  async getCredores(): Promise<any> {
    const queryParameter = this.apiUrl + `/ExternalApi/GetCredores`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const returned = this.http.get<any>(queryParameter, { headers });

    return await returned.toPromise();
  }

  async getConsorciosPublicos(): Promise<any> {
    const queryParameter = this.apiUrl + `/ConsorcioPublico`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const returned = this.http.get<any>(queryParameter, { headers });

    return await returned.toPromise();
  }

  async postConsorcio(consorcio: any): Promise<any> {
    const queryParameter = this.apiUrl + `/ConsorcioPublico`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const returned = this.http.post<any>(
      queryParameter,
      consorcio,
      httpOptions
    );

    return await returned.toPromise();
  }

  async putConsorcio(consorcio: any): Promise<any> {
    const queryParameter = this.apiUrl + `/ConsorcioPublico`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const returned = this.http.put<any>(queryParameter, consorcio, httpOptions);

    return await returned.toPromise();
  }

  getConsorcioId(id: any): Observable<any> {
    const queryParameter = this.apiUrl + `/ConsorcioPublico/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(queryParameter, { headers });
  }

  async printConsorcio(consorcioData: any, credor: any, ugs: any) {
    const header = await getPdfHeader(``);
    const doctDefinition: any = {
      content: [
        ...header,
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*'], // Adjust column widths
            body: [
              [
                {
                  text: 'NÚMERO',
                  style: {
                    fontSize: 10,
                    bold: true,
                  },
                },
                consorcioData.numeroConsorcio,
              ],
              [
                {
                  text: 'DATA DA EMISSÃO',
                  style: {
                    fontSize: 10,
                    bold: true,
                  },
                },
                this.maskService.formatarData(consorcioData.dataEmissao),
              ],
              [
                {
                  text: 'NOME DO CONSÓRCIO',
                  style: {
                    fontSize: 10,
                    bold: true,
                  },
                },
                consorcioData.nomeConsorcio,
              ],
              [
                {
                  text: 'CNPJ',
                  style: {
                    fontSize: 10,
                    bold: true,
                  },
                },
                credor,
              ],
              [
                {
                  text: 'CONTRATO DE RATEIO Nº',
                  style: {
                    fontSize: 10,
                    bold: true,
                  },
                },
                consorcioData.numeroContratoRateio,
              ],
              [
                {
                  text: 'UG INTERVENIENTE',
                  style: {
                    fontSize: 10,
                    bold: true,
                  },
                },
                ugs.map((ug: any) => ug.nome).join(', '),
              ],
              [
                {
                  text: 'DATA INÍCIO VIGÊNCIA',
                  style: {
                    fontSize: 10,
                    bold: true,
                  },
                },
                this.maskService.formatarData(consorcioData.dataInicioVigencia),
              ],
              [
                {
                  text: 'DATA FIM VIGÊNCIA',
                  style: {
                    fontSize: 10,
                    bold: true,
                  },
                },
                this.maskService.formatarData(consorcioData.dataFimVigencia),
              ],
              [
                {
                  text: 'VALOR',
                  style: {
                    fontSize: 10,
                    bold: true,
                  },
                },
                this.maskService.formatarMoeda(consorcioData.valor),
              ],
              [
                {
                  text: 'FINALIDADE',
                  style: {
                    fontSize: 10,
                    bold: true,
                  },
                },
                consorcioData.finalidade,
              ],
            ],
          },
          style: 'tableStyle',
        },
      ],
      styles: {
        tableStyle: {
          fontSize: 10,
          color: '#333',
          marginBottom: 15,
        },
        header: {
          fontSize: 12,
          bold: true,
          color: 'rgb(112, 112, 112)',
        },
        cell: {
          fontSize: 7,
          color: 'rgb(112, 112, 112)',
        },
        filtros: {
          fontSize: 9,
          color: 'rgb(112, 112, 112)',
        },
        sectionTitle: {
          fontSize: 12,
          bold: true,
        },
      },
    };

    pdfMake.createPdf(doctDefinition).download('consorcioData.pdf');
  }
}
