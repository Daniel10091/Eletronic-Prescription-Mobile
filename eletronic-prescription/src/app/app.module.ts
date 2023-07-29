import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterLink, RouterLinkActive } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './core/services/login/login.service';
import { FolderPage } from './folder/folder.page';
import { HomeComponentsModule } from './pages/home/components/home-components.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    // Components
    AppComponent, 
    // Modules
    FolderPage, 
    // Pages
  ],
  imports: [
    CommonModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    RouterLink, 
    RouterLinkActive, 
    AppRoutingModule, 
    HttpClientModule, 
    // Pages Components
    HomeComponentsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LoginService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
