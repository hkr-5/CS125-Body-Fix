import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  

  constructor(private alertController: AlertController) {}
  async presentAlert() {
    const distance = await this.alertController.create({
      header: 'Select different location',
      buttons: ['OK'],
      inputs: [
        {
          label: '5 Miles',
          type: 'radio',
          value: 'red',
        },
        {
          label: '10 Miles',
          type: 'radio',
          value: 'blue',
        },
        {
          label: '15 Miles',
          type: 'radio',
          value: 'green',
        },
      ],
    });

    await distance.present();
  }
  async presentPrice() {
    const price = await this.alertController.create({
      header: 'Please enter price',
      buttons: ['OK'],
      inputs: [
        {
          type: 'number',
          placeholder: 'Price',
          min: 1,
        },
      ],
    });
    await price.present();
  }
  async presentStar() {
    const star = await this.alertController.create({
      header: 'Please select star',
      buttons: ['OK'],
      inputs: [
        {
          label: '☆',
          type: 'radio',
          value: 'one',
        },
        {
          label: '☆ ☆',
          type: 'radio',
          value: 'two',
        },
        {
          label: '☆ ☆ ☆',
          type: 'radio',
          value: 'three',
        },
        {
          label: '☆ ☆ ☆ ☆',
          type: 'radio',
          value: 'four',
        },
        {
          label: '☆ ☆ ☆ ☆ ☆',
          type: 'radio',
          value: 'five',
        },
      ],
    });
    await star.present();
  }
  
}
