import {Routes, RouterModule} from "@angular/router";
import { Component, ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";

import {AdminGuard } from "./guards/admin.guard";
import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";
import { CreateClientComponent } from "./components/clientes/create-client/create-client.component";
import { EditClientesComponent } from "./components/clientes/edit-clientes/edit-clientes.component";
const appRoute:Routes = [
  {path:"", redirectTo: "inicio", pathMatch:"full"},
  {path:"inicio", component: InicioComponent,canActivate:[AdminGuard]},
  {path: "panel", children: [
    {path: "clientes", component: IndexClienteComponent, canActivate:[AdminGuard]},
    {path: "clientes/registro", component: CreateClientComponent, canActivate:[AdminGuard]},
    {path: "clientes/:id", component: EditClientesComponent, canActivate:[AdminGuard]}

  ]},
  {path:"login", component: LoginComponent}
]

export const appRoutingProviders:any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
