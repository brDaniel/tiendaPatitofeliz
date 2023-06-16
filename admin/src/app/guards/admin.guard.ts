import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate{
  constructor(
    private _adminservice: AdminService,
    private _router: Router
  ){

  }

  canActivate():any{
    if(!this._adminservice.isAuthenticated(['admin'])){
      this._router.navigate(['/login'])
      return false;
    }else{
      return true;
    }
  }

}
// export const adminGuard: CanActivateFn = (route, state) => {
//   const admnService = new AdminService();

//   if(admnService.isAuthenticated()){
//   }
//   else{
//     return false
//   }
// };
