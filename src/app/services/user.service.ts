import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { UserData } from '../data/user-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public static user: UserData;

  public static async getUser() {
    console.log('get user called');
    const { value } = await Preferences.get({
      key: 'user',
    });

    if (value) {
      const user: UserData = JSON.parse(value);
      UserService.user = user;
    }
  }

  public static async setUser(data: UserData) {
    Preferences.set({
      key: 'user',
      value: JSON.stringify(data),
    });
    UserService.getUser();
  }

  public static async deleteUser() {
    await Preferences.remove({
      key: 'user',
    });
    UserService.getUser();
  }

  public static async addLog(timestamp: number, weight: number) {
    UserService.user.logs[timestamp] = { timestamp, weight };
    UserService.setUser(UserService.user);
  }
}
