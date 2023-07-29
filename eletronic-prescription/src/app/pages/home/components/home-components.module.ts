import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDigitalSignatureComponent } from './modal-digital-signature/modal-digital-signature.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ModalDigitalSignatureComponent
  ],
  imports: [
    CommonModule, 
    IonicModule.forRoot(), 
  ]
})
export class HomeComponentsModule { }
