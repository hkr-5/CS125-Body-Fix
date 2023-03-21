import { LogData } from './log-data';

export class UserData {
  name?: string;
  firstName?: string;
  lastName?: string;
  age: number;
  height: number;
  goal: number;
  logs: Record<number, LogData>;

  constructor() {}
}
