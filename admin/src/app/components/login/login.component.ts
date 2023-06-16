import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
declare var jQuery: any;
declare var $: any;
declare const iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: any = {};
  public loggedUser: any = {};
  public token: any = '';

  constructor(private _adminService: AdminService, private _router: Router) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    console.log(this.token);
    if(this.token){
      this._router.navigate(['/'])
    }

  }

  login(loginForm: NgForm) {
    if (loginForm.valid) {
      let data = {
        email: this.user.email,
        password: this.user.password,
      };

      // console.log(data);

      this._adminService.loginAdmin(data).subscribe(
        (response) => {
          if (response.data == undefined) {
            iziToast.show({
              title: 'Error!',
              titleColor: 'red',
              class: 'text-danger',
              position: 'topRight',
              message: response.message,
            });
          } else {
            this.loggedUser = response.data;
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', this.loggedUser._id);
            this._router.navigate(['/']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
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
