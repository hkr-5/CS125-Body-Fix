import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';



@NgModule({
  declarations: [
    RestaurantComponent,
    EmptyScreenComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    RestaurantComponent,
    EmptyScreenComponent
  ],
  entryComponents: []
})
export class ComponentsModule { }
