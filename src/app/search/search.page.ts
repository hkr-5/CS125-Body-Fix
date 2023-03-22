import { Component, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {

  @ViewChild('searchInput') sInput;
  model: any = {
    icon: 'search-outline',
    title: 'No Restaurants Record Found'
  };
 

  isLoading: boolean = false;
  query: any;
  term:string = '';
  latitude:number =0;
  longitude:number =0;
  allRestaurants: any[] = [];
  restaurants: any[] = [];
  recommendationList: any[] = [];
  //for modal - recommendation
  recipes: any[] = []; //used
  dishName: string ='';
  isModalOpen = false;
  isRecommend = false;
  url='';
  option;

 
  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
    console.log('Current position:', coordinates.coords);
  };

  async setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    console.log(this.isModalOpen);
  }
  
  content: any;
  constructor(private alertController:AlertController,private cdr: ChangeDetectorRef) {
    this.restaurants=[]
    this.recommendationList=[];
  }

  
  async dishChange(e){
    this.dishName = await e.detail.value;
    console.log("dish name ", this.dishName);
  }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      //this.sInput.setFocus();
      this.getRecipe();
      this.isLoading = false;
      //this.getFile(this.location,this.sort_by,this.limit);
      this.printCurrentPosition();
    }, 500);
  }

  async onSearchChange(event:any) {
    this.query = await event.detail.value.toLowerCase();
    //this.getTerm(this.query)
    this.isLoading = false;

    this.getTerm(this.query);
    console.log("final tryyyyyyyyyyyyyyyyyyyyyy",this.allRestaurants);
    
    if(this.dishName.length > 0) { 
      setTimeout(async() => {
        // this.restaurants = await this.allRestaurants.filter((element: any) => {
        //   return element.alias
        //   .includes(this.query);
        // });
        this.getTerm(this.dishName);
        //this.recommendationList=[];
        this.recommendation();
        console.log("restaurant array ",this.restaurants);
        this.isLoading = false;
      },500);
    }
  }

  //To search item first
  getTerm(query:string){
    this.cdr.detectChanges();
    console.log("Lat ", this.latitude);
    console.log("Long ", this.longitude);
    //const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=33.6458966&longitude=-117.843429&term=%20restaurants&sort_by=best_match&limit=50`;
    const url =`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?`
                + `latitude=${this.latitude}&longitude=${this.longitude}&term=${query}%20restaurant&sort_by=best_match&limit=50`;
    console.log("url  ", url);
    const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer ANqL8DWNmjbGyOciXVpmjB6x3hLHLW8EyzUS8z5hSZSSHjS2E7vzhlJsXQYVqiSfSQJzfW3ZeFP5SCV-jggrnLwP7xkrX47lHHn1lGEK9OdEYNKIT7_ujom13aYKZHYx',
    }
    };

    fetch(url, options)
    .then( response =>  response.json())
    .then( response => {
    this.allRestaurants = response.businesses;
    this.recommendation();
    })
    .catch(err => console.error(err));

    this.url=url;
    this.option=options;
}

async dishClick(event: Event, index: number){
  this.isRecommend = true;
  const alert = await this.alertController.create({
    header: 'Choosing '+this.recipes[index].recipe.label + " for the menu?",
    cssClass: 'custom-alert',
    buttons: [
      {
        text: 'No',
        cssClass: 'alert-button-cancel',
      },
      {
        text: 'Yes',
        cssClass: 'alert-button-confirm',
      },
    ],
  });

  await alert.present();
  this.dishName=this.recipes[index].recipe.label;
}

async currentStatus() {
  const sorted = Object.keys(UserService.user.logs).sort(
    (a, b) => Number(a) - Number(b)
  );
  let goal=UserService.user.goal;
  let currentWeight=await UserService.user.logs[sorted[sorted.length - 1]].weight;
  console.log(currentWeight/goal)
  return currentWeight/goal;
}
  
async recommendation(){
  interface ScoreRestaurant {
    id:string;
    score:number;
  }
  const scoreRestaurant:ScoreRestaurant[] = [];
  const healthyCategory: string[] = ['vegetarian', 'vegan', 'japanese', 'yogurt', 'sushi', 'organic', 'brunch','sandwiches','seafood'];
  const unhealthyCategory:string[]=['burgers','fast food','barbeque'];

  this.recommendationList=[];
  console.log("*********",this.dishName);

  //calcuate the total distance and total review count for all restaurant
  let totalDistance=0;
  let totalReviewCount=0;
  
  for(let index in this.allRestaurants){
    totalDistance+=this.allRestaurants[index].distance;
    totalReviewCount+=this.allRestaurants[index].review_count;
  }
  
  //calcuate score for each restaurant
  for(let index in this.allRestaurants){
    let currentItem=this.allRestaurants[index];
    let scoreCategory=0;
    let scoreDistance=0;
    let scoreRating=0;
    let scoreReivewCount=0;
    let finalScore=0;
    let currentGoalWeight=this.currentStatus();

    scoreRating=currentItem.rating*2;
    scoreDistance=(1-currentItem.distance/totalDistance)*10;
    scoreReivewCount=(currentItem.review_count/totalReviewCount)*10;
    //cacluate score based on categories
    for(let index in currentItem.categories){
      if(healthyCategory.includes(currentItem.categories[index].title.toLowerCase())){
        scoreCategory+=3;
      }
      if(unhealthyCategory.includes(currentItem.categories[index].title.toLowerCase())){
        scoreCategory-=3;
      }
    }

    finalScore=0.4*scoreDistance+0.3*scoreCategory*await currentGoalWeight+0.2*scoreRating+0.1*scoreReivewCount;
    scoreRestaurant.push({id:currentItem.id,score:finalScore});
  }
  scoreRestaurant.sort((a, b) => b.score - a.score);
  console.log(scoreRestaurant);

  let recommendationCount=0;
  if(this.allRestaurants.length<10){
    recommendationCount=1;
  }
  else{
    recommendationCount=0.1*this.allRestaurants.length;
    if(recommendationCount>3){recommendationCount=3;}
  }

  //push top score restaurant to the recommendation array
  
  for (let i = 0; i <recommendationCount; i++) {
    let tempr=this.allRestaurants;
    const goodRestaurant=tempr.find(tempr =>tempr.id===scoreRestaurant[i].id);
    this.recommendationList.push(goodRestaurant);
  }
  console.log("what is this:",this.recommendationList)
  this.isLoading=true;
}

getRecipe(){
  console.log("what I'm searching right now:", this.query)
  //const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=33.6458966&longitude=-117.843429&term=%20restaurants&sort_by=best_match&limit=50`;
  const url =`https://cors-anywhere.herokuapp.com/https://api.edamam.com/api/recipes/v2?type=public&q=${this.query}&app_id=a2f7ac53&app_key=88fb0ae6e13d68732f18a286b3e8ae53&calories=0-300
  `;       
    console.log("url  ", url);
    const options = { 
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: '88fb0ae6e13d68732f18a286b3e8ae53',
    }
  };
  fetch(url, options)
    .then(response => response.json())
    .then(async response => {
      this.recipes = await response.hits;
  })
  .catch(err => console.error(err));
}


  startRecommendation(){
    this.recommendationList=[];
    this.allRestaurants=[];
    console.log("what dish I choose***************",this.dishName)
    this.getTerm(this.dishName);
    
}

}
