import { Component, OnInit } from '@angular/core';
import { ListaConsorciosPublicosService } from '../services/lista-consorcios-publicos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-consorcio',
  templateUrl: './editar-consorcio.component.html',
  styleUrls: ['./editar-consorcio.component.scss'],
})
export class EditarConsorcioComponent implements OnInit {
  consorcioId!: number;
  consorcioEditData: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listaConsorcioService: ListaConsorciosPublicosService
  ) {}

  ngOnInit() {
    this.consorcioEditData = this.route.snapshot.data['consorcioEditData'];
  }

  async updateConsorcio(consorcio: any) {
    debugger;
    consorcio.id = this.consorcioEditData.id;
    await this.listaConsorcioService.putConsorcio(consorcio).then(
      (data: any) => {
        console.log(data);

        this.router.navigateByUrl('/lista-consorcios');
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
