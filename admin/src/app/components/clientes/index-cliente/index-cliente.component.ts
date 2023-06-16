import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css'],
})
export class IndexClienteComponent implements OnInit {
  public clients: Array<any> = [];
  public filtro_apellidos = '';
  public filtro_email = '';
  public page=1;
  public pageSize=5;

  constructor(private _clienteService: ClienteService) {}
  ngOnInit(): void {
    this.initData();
  }
  
  initData(){
    this._clienteService.getAllClients(null, null).subscribe(
      (resposne) => {
        this.clients = resposne.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filtro(tipo: any) {
    const filtro =
      tipo == 'apellidos' ? this.filtro_apellidos : this.filtro_email;
      this._clienteService.getAllClients(tipo, filtro).subscribe(
        (resposne) => {
          this.clients = resposne.data;
        },
        (error) => {
          console.log(error);
        }
      );

    
  }
}
