import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare const iziToast: any;

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent implements OnInit {
  public cliente: any = {
    gender : '',
  };
  public token:any;
  constructor(
    private _clienteService:ClienteService,
    private _adminService:AdminService,
    private _router:Router
  ) {
    this.token = _adminService.getToken();
  }

  ngOnInit(): void {}

  registroCliente(registroForm: any) {
    if (registroForm.valid) {
      this._clienteService.createClientAdmin(this.cliente).subscribe(
        resposne=>{
          iziToast.show({
            title: 'Success!',
            titleColor: 'green',
            class: 'text-succes',
            position: 'topRight',
            message: 'se ah registrado correctamente un clinete',
          });
          this.cliente ={
            gender: '',
            first_name: '',
            last_name: '',
            birthday: '',
            email: '',
            tel: '',
          }
          this._router.navigate(['/panel/clientes'])
        },
        error=>{
          console.log(error);
          
        }
      )
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: 'los datos no son validos',
      });
    }
  }
}
