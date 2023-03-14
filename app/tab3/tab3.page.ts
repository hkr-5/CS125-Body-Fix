import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  searchItem:string;
  restaurants;
  
  constructor(private alertController: AlertController) {
    this.searchItem="";
    this.restaurants=[];
  }
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
  
  getFile(item:string){
  const url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
  const params = {
    term: item,
    location: 'irvine',
  };

  const headers = {
    Authorization: `Bearer ANqL8DWNmjbGyOciXVpmjB6x3hLHLW8EyzUS8z5hSZSSHjS2E7vzhlJsXQYVqiSfSQJzfW3ZeFP5SCV-jggrnLwP7xkrX47lHHn1lGEK9OdEYNKIT7_ujom13aYKZHYx`,
    accept: 'application/json',
  };

  axios
    .get(url, { headers, params }).then((response) => {
      this.restaurants=response.data;
      


      console.log(response.data);})
    .catch((error) => {console.error(error);
    });
  }



//   ionChange(event) {

//     this.getFile(event.detail.value);

//     console.log(this.getFile(event.detail.value));
// }


}
