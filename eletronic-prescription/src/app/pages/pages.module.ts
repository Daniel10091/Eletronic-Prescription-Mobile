import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home/home.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './login/login.page';
import { PagesPageRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [
    LoginPage,
    HomePage
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PagesPageRoutingModule
  ]
})
export class PagesModule { }
