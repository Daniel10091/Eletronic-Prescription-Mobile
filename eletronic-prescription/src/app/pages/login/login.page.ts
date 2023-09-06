import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AlertController, CheckboxCustomEvent, IonInput, IonicModule, LoadingController, NavController, SelectCustomEvent } from '@ionic/angular';
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    BrowserModule, 
    IonicModule, 
  ],
})
export class LoginPage implements OnInit {

  ufs: any[] = [
    { value: 'AC', title: 'AC' },
    { value: 'AL', title: 'AL' },
    { value: 'AM', title: 'AM' },
  ];

  doctorLoginValue: string = '';
  pharmacistLoginValue: string = '';

  isPharmacist: string = 'false';
  radioList = [
    {
      value: 'false',
      label: 'Doctor',
      title: 'médico'
    },
    {
      value: 'true',
      label: 'Pharmacist',
      title: 'farmacêutico'
    }
  ]
  
  @ViewChild('ionInputElDoctor', { static: true }) ionInputElDoctor!: IonInput;
  @ViewChild('ionInputElPharmacist', { static: true }) ionInputElPharmacist!: IonInput;

  loginFieldIsEmpty: boolean = false;
  ufFieldIsEmpty: boolean = false;
  passwordFieldIsEmpty: boolean = false;

  disableLoginButton: boolean = true;
  
  loginData: any = {
    loginValue: null,
    ufValue: null,
    passwordValue: null,
  }
  // loginValue: string = null;
  // ufValue: string = null;
  // passwordValue: string = null;
  invalidLogin: string = '';
  invalidUf: string = '';
  invalidPassword: string = '';
  
  loginSetTimeout: number = 2000;

  constructor(
    private navController: NavController,
    private loginService: LoginService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    // private digitalSignatureService: DigitalSignatureService,
  ) { }

  ngOnInit(): any {
    if (localStorage.getItem('reload') === 'true') {
      document.location.reload();
      localStorage.setItem('reload', 'false');
    }
  }

  onPharmacist(event: Event) {
    const ev = event as CheckboxCustomEvent;
    this.isPharmacist = ev.detail.value;
    this.doctorLoginValue = '';
    this.pharmacistLoginValue = '';
    this.invalidLogin = ''
  }

  onDoctorInput(ev: any): any {
    const value = ev.target!.value;
    
    const filteredValue = value.replace(/[^0-9]+/g,'');
    
    // if (filteredValue) {
    //   if (filteredValue.length === 11) {
    //     filteredValue = filteredValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
    //   }
    // }
    // console.log('\n\n');

    // console.log('filteredValue = ' + filteredValue);

    this.doctorLoginValue = filteredValue;

    // console.log('doctorLoginValue = ' + this.doctorLoginValue);
    // console.log('ionInputElDoctor = ' + this.ionInputElDoctor);
    // console.log('\n\n');
  }

  onPharmacistInput(ev: any): any {
    const value = ev.target!.value;
    
    const filteredValue = value.replace(/[^0-9]+/g,'');
    
    // if (filteredValue) {
    //   if (filteredValue.length === 11) {
    //     filteredValue = filteredValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
    //   }
    // }
    
    this.pharmacistLoginValue = filteredValue;
  }

  onLoginInput(event: any): any {
    this.loginData.loginValue = event.target!.value;

    if (this.loginData.loginValue != null && this.loginData.loginValue != '') 
      this.invalidLogin = '';
    else this.invalidLogin = 'is-null';
  }

  onUfChanged(event: Event): any {
    const ev = event as SelectCustomEvent;

    this.loginData.ufValue = ev.target.value[0];

    if (this.loginData.ufValue != null && this.loginData.ufValue != '') 
      this.invalidUf = '';
    else this.invalidUf = 'is-null';
  }

  onPasswordInput(event: any): any {
    this.loginData.passwordValue = event.target!.value;

    if (this.loginData.passwordValue != null && this.loginData.passwordValue != '') 
      this.invalidPassword = '';
    else this.invalidPassword = 'is-null';
  }

  onValidateLogin(): any {
    if (this.loginData.loginValue != null && this.loginData.loginValue != '') 
      if (this.loginData.ufValue != null && this.loginData.ufValue != '') 
        if (this.loginData.passwordValue != null && this.loginData.passwordValue != '') 
          this.disableLoginButton = false;
        else this.disableLoginButton = true;
      else this.disableLoginButton = true;
    else this.disableLoginButton = true;
  }
  
  manterDadosLogin(dadosLogin: any): void {
    const loginConfig = {
      sguf: dadosLogin.ufSelecionada,
      psc: dadosLogin.pscSelecionado,
      inTipoPessoa: dadosLogin.inTipoPessoa,
    };
    localStorage.setItem('loginConfig', JSON.stringify(loginConfig));
  }

  async loginWithCertificate(): Promise<void> {
    
  }
  
  async login(): Promise<void> {
    this.showLoading();

    const isAlthenticated = await this.loginService.login(this.loginData, this.loginSetTimeout);

    if (isAlthenticated) {
      localStorage.setItem('token', 'token');
      console.log(localStorage.getItem('token'));
      this.navController.navigateRoot(['inicio']);
    } else {
      this.invalidLogin = 'is-null';
      this.presentAlert('Erro ao tentar fazer login', 'Verifique os campos e tente novamente.');
    }
  }

  onLoginSuccess(result: any) {
    this.navController.navigateRoot(['inicio']);
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      duration: this.loginSetTimeout,
    });

    loading.present();
  }

}
