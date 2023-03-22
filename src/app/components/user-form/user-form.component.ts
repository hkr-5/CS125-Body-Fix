import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  firstName: string;
  lastName: string;
  age: number;
  feet: number;
  inches: number;
  weight: number;
  goal: number;

  constructor() {}

  ngOnInit() {}

  handleFirstName(event) {
    this.firstName = event.detail.value;
  }

  handleLastName(event) {
    this.lastName = event.detail.value;
  }

  handleAge(event) {
    this.age = Number(event.detail.value);
  }

  handleFeet(event) {
    this.feet = Number(event.detail.value);
  }

  handleInches(event) {
    const { value } = event.detail;
    this.inches = Number(value > 11 ? 11 : value);
    console.log(this.inches);
  }

  handleWeight(event) {
    this.weight = Number(event.detail.value);
  }

  handleGoal(event) {
    this.goal = Number(event.detail.value);
  }

  async handleUserCreation() {
    const timestamp = startOfDay(new Date()).getTime();

    await UserService.setUser({
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      height: this.feet * 12 + this.inches,
      goal: this.goal,
      logs: {
        [timestamp]: {
          timestamp,
          weight: this.weight,
        },
      },
    });

    UserService.getUser();
  }

  get isEnabled() {
    return (
      Boolean(this.firstName) &&
      Boolean(this.lastName) &&
      Boolean(this.age) &&
      Boolean(this.feet) &&
      Boolean(this.weight) &&
      Boolean(this.goal)
    );
  }
}