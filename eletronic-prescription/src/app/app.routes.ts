import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  // {
  //   path: 'pacientes',
  //   loadComponent: () =>
  //     import('./pages/patients/patients.page').then((m) => m.PatientsPage),
  // },
  // {
  //   path: 'locais-de-atendimento',
  //   loadComponent: () => 
  //     import('./pages/services-locations/services-locations.page').then((m) => m.ServicesLocationsPage),
  // },
  // {
  //   path: 'meus-documentos-medicos',
  //   loadComponent: () => 
  //     import('./pages/my-medical-documents/my-medical-documents.page').then((m) => m.MyMedicalDocumentsPage),
  // },
  // {
  //   path: 'modelos-de-documentos-medicos',
  //   loadComponent: () => 
  //     import('./pages/medical-documents-templates/medical-documents-templates.page').then((m) => m.MedicalDocumentsTemplatesPage),
  // },
  // {
  //   path: 'sair',
  //   loadComponent: () => 
  //     import('./pages/exit/exit.page').then((m) => m.ExitPage),
  // },
  // {
  //   path: 'atestado-medico',
  //   loadComponent: () => 
  //     import('./pages/medical-documents/medical-certificate/medical-certificate.page').then((m) => m.MedicalCertificatePage),
  // },
  // {
  //   path: 'services-locations',
  //   loadComponent: () => import('./pages/services-locations/services-locations.page').then( m => m.ServicesLocationsPage),
  // },
];
