import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public async login(params: any, timing: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (params.loginValue === '12345' && params.passwordValue === 'admin') {
          resolve(true);
        } else {
          resolve(false);
        }
      }, timing);
    });
  }
  
}
