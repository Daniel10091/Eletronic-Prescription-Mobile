import { Component } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    { title: 'Início', url: 'inicio', icon: 'home' },
    { title: 'Pacientes', url: 'pacientes', icon: 'people' },
    { title: 'Locais de Atendimento', url: 'locais-de-atendimento', icon: 'location' },
    { title: 'Meus documentos médicos', url: 'meus-documentos-medicos', icon: 'documents' },
    { title: 'Modelos de documentos médicos', url: 'modelos-de-documentos-medicos', icon: 'document-text' },
    // { title: 'Sair', url: 'login', icon: 'exit' },
  ];
  
  constructor(private navController: NavController) { }

  ionViewWillEnter() {
    StatusBar.setBackgroundColor({ color: '#000000' });
    // StatusBar.setStyle({ style: 'light' });
  }

  logout() {
    localStorage.removeItem('token');
    this.navController.navigateRoot(['login']);
  }

}
