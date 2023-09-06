import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';

@NgModule({
  declarations: [
    // LoginPage,
    // HomePage
  ],
  imports: [
    CommonModule, 
    BrowserModule, 
    IonicModule.forRoot(), 
    FormsModule, 
    RouterLink, 
    RouterLinkActive, 
    AppRoutingModule, 
    HttpClientModule, 
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
