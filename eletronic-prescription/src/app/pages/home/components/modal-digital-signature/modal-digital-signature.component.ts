import { Component, OnInit } from '@angular/core';
import { CheckboxCustomEvent, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-digital-signature',
  templateUrl: './modal-digital-signature.component.html',
  styleUrls: ['./modal-digital-signature.component.scss'],
})
export class ModalDigitalSignatureComponent  implements OnInit {

  canDismiss: boolean = true;
  presentingElement: any = null;

  name?: string;
  
  canConfirm: boolean = false;

  signatureTypes: any[] = [
    { id: 1, value: 'fisicToken', title: 'Token físico' },
    { id: 2, value: 'VIDAAS', title: 'VIDAAS' },
  ];
  
  signatureSectionDurations: any[] = [
    { id: 1, value: '1', title: '1 Hora' },
    { id: 2, value: '2', title: '2 Horas' },
    { id: 3, value: '3', title: '3 Horas' },
    { id: 4, value: '4', title: '4 Horas' },
    { id: 5, value: '6', title: '6 Horas' },
    { id: 6, value: '8', title: '8 Horas' },
    { id: 7, value: '12', title: '12 Horas' },
  ];

  signatureType?: string;
  signatureSectionDuration?: string;

  constructor(private modalController: ModalController) { }

  ngOnInit(): any {
    this.presentingElement = document.querySelector('.page');
  }

  onSignatureTypeChange(event: Event): any {
    const ev = event as CheckboxCustomEvent;

    this.signatureType = ev.detail.value;

    if (this.signatureType != null && this.signatureSectionDuration != null) 
      this.canConfirm = true;
    else this.canConfirm = false;
  }

  onSignatureSectionDurationChange(event: Event): any {
    const ev = event as CheckboxCustomEvent;

    this.signatureSectionDuration = ev.detail.value;

    if (this.signatureType != null && this.signatureSectionDuration != null) 
      this.canConfirm = true;
    else this.canConfirm = false;
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(this.signatureType, 'confirm');
  }

}
