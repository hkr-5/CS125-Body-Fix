import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  
  people="10"
  
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
  
  // getFile(){
  //   const options = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: 'Bearer ANqL8DWNmjbGyOciXVpmjB6x3hLHLW8EyzUS8z5hSZSSHjS2E7vzhlJsXQYVqiSfSQJzfW3ZeFP5SCV-jggrnLwP7xkrX47lHHn1lGEK9OdEYNKIT7_ujom13aYKZHYx',
  //     'Access-Control-Allow-Origin': 'https://localhost:8100'
  //   }
  //     };
  //     fetch('https://api.yelp.com/v3/businesses/search?location=irvine&term=innout&sort_by=best_match&limit=20', options)
  //       .then(response => response.json())
  //       .then(response => console.log(response))
  //       .catch(err => console.error(err));
  // }

 



  getFile(){
    const url = 'https://api.yelp.com/v3/businesses/search';

// Set up the request parameters, such as the search term and location
const params = {
  term: 'pizza',
  location: 'San Francisco',
};

// Set up the request headers, including the API key and the CORS header
const headers = {
  Authorization: `Bearer ANqL8DWNmjbGyOciXVpmjB6x3hLHLW8EyzUS8z5hSZSSHjS2E7vzhlJsXQYVqiSfSQJzfW3ZeFP5SCV-jggrnLwP7xkrX47lHHn1lGEK9OdEYNKIT7_ujom13aYKZHYx`,
  'Access-Control-Allow-Origin': '*',
};

// Send the API request and get the response
axios
  .get(url, { headers, params })
  .then((response) => {
    // Handle the response data
    console.log(response.data);
  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
  });
  }



}
