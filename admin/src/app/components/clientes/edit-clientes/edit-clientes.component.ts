import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
declare const iziToast: any;


@Component({
  selector: 'app-edit-clientes',
  templateUrl: './edit-clientes.component.html',
  styleUrls: ['./edit-clientes.component.css']
})
export class EditClientesComponent implements OnInit{
  public cliente: any = {
    gender : '',
  };

  public id:any; 


  constructor(
    private _route:ActivatedRoute,
    private _cleinteService:ClienteService,
    private _router:Router
  ){
    
  }
  ngOnInit(): void {

    this._route.params.subscribe(
      params=>{
        this.id = params['id']
        this._cleinteService.getClientAdmin(this.id).subscribe(
          response=>{
            
            if(response.data == undefined){
              this.cliente = undefined
            }
            this.cliente = response.data          


            
          },
          error=>{
            console.log(error);
            
          }
        ) 
      }    
    )
    
  }

  editarCliente(registroForm:any){
    if(registroForm.valid){
      this._cleinteService.updateClientAdmin(this.id,this.cliente).subscribe(
        response=>{
          iziToast.show({
            title: 'Success!',
            titleColor: 'green',
            class: 'text-succes',
            position: 'topRight',
            message: 'se ah actualizado correctamente un clinete',
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

    }else{
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
    
