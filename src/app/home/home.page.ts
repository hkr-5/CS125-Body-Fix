import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { format, isToday } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private alertController: AlertController) {}

  handleReset() {
    UserService.deleteUser();
  }

  get userExists() {
    return Boolean(UserService.user);
  }

  get user() {
    return UserService.user;
  }

  get firstLog() {
    const sorted = Object.keys(UserService.user.logs).sort(
      (a, b) => Number(a) - Number(b)
    );
    return UserService.user.logs[sorted[0]];
  }

  get latestLog() {
    const sorted = Object.keys(UserService.user.logs).sort(
      (a, b) => Number(a) - Number(b)
    );
    return UserService.user.logs[sorted[sorted.length - 1]];
  }

  get progress() {
    const start = this.firstLog.weight;
    const current = this.latestLog.weight;
    const goal = this.user.goal;
    const range = start - goal;
    const progress = start - current;
    const percentage = Math.round((progress / range) * 100);

    console.log('start', start, 'current', current, 'goal', goal);
    return Math.max(percentage, 0);
  }

  get loggedToday() {
    return isToday(new Date(this.latestLog.timestamp));
  }

  get lastLoggedDate() {
    const date = new Date(this.latestLog.timestamp);

    if (this.loggedToday) {
      return `today`;
    }
    return `on ${format(date, 'PPPP')}`;
  }
}
