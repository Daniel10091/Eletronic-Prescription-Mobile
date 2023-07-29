import { Component, OnInit, ViewChild } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { AnimationController, CheckboxCustomEvent, IonToggle, ModalController, NavController } from '@ionic/angular';
import { ModalDigitalSignatureComponent } from './components/modal-digital-signature/modal-digital-signature.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  crms: any[] = [
    { id: 1, value: 'CRM-1', title: 'CRM-1' },
    { id: 2, value: 'CRM-2', title: 'CRM-2' },
  ];

  signingInfoIsVisible: string = '';

  swichDigitalSignature: boolean = false;

  @ViewChild('digitalSignature', { static: true }) digitalSignature!: IonToggle;

  isModalDigitalSignatureHidden: boolean = true;
  isModalDigitalSignatureQrcodeOpen: boolean = false;

  constructor(
    private navController: NavController,
    private modalController: ModalController,
    private animationController: AnimationController
  ) { }

  ngOnInit(): any {
    if (localStorage.getItem('reload') === 'true') {
      document.location.reload();
      localStorage.setItem('reload', 'false');
    }
  }

  navigate( page: string ) {
    this.navController.navigateRoot(page);
  }

  async openDigitalSignatureSection(event: Event): Promise<void> {
    const ev = event as CheckboxCustomEvent;
    
    if (ev.detail.checked) {
      const modal = await this.modalController.create({
        component: ModalDigitalSignatureComponent,
      });
      modal.present();
      this.isModalDigitalSignatureHidden = false;
  
      const { data, role } = await modal.onWillDismiss();
  
      if (role === 'confirm') {
        setTimeout(() => {
          // this.setModalDigitalSignatureQrcodeOpen(true);
          switch (data) {
            case 'VIDAAS':
              const qrcodeSecretCode: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBsaWNhdGlvbk5hbWUiOiJDZXJ0aWxsaW9uIENzcyIsImFwcGxpY2F0aW9uVHlwZSI6ImNvbW1vbiIsInNpZ25hdHVyZVNjb3BlIjoic2lnbmF0dXJlX3Nlc3Npb24iLCJqdGkiOiI0NjQxMmFiNi0zMDY0LTQwYzItYmI0ZS1jMDJjYjkxY2Y4YjIiLCJpYXQiOjE2ODQ5Mjg2NjcsImV4cCI6MTY4NDkyODk2N30.5PtINxNpm2jQgzKSVMqMhdWwnstsD4fKEt4y5_kOzgE';
              const url: string = `https://certificado.vidaas.com.br/qrcode-authorizations?q=${qrcodeSecretCode}`;
              this.openCapacitorSite(url);
              break;
            case 'fisicToken':
              alert('Insera o penisdrive!');
              break;
            default:
              break;
          }
        }, 500);
        this.isModalDigitalSignatureHidden = true;
      } else {
        this.isModalDigitalSignatureHidden = true;
        this.swichDigitalSignature = false;
        this.digitalSignature.checked = false;
        // setTimeout(() => {
        //   alert('A abertura da sessão de assinatura digital foi cancelada!');
        // }, 500);
      }
    }
  }

  async openCapacitorSite(url: string) {
    await Browser.open({ url: url });
  };

  setModalDigitalSignatureQrcodeOpen(isOpen: boolean) {
    this.isModalDigitalSignatureQrcodeOpen = isOpen;
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot!;

    const backdropAnimation = this.animationController
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationController
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationController
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(300)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

}
