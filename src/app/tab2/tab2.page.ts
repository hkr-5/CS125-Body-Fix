import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UserService } from '../services/user.service';
import 'chartjs-adapter-date-fns';
import { formatISO, startOfDay } from 'date-fns';
import { enUS } from 'date-fns/locale';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  lineChart: any;
  date = formatISO(startOfDay(new Date()));
  weight: number;

  constructor() {}

  ngOnInit() {
    const sorted = Object.keys(UserService.user.logs);

    this.weight = UserService.user.logs[sorted[sorted.length - 1]].weight;
  }

  async addLog() {
    await UserService.addLog(
      startOfDay(new Date(this.date)).getTime(),
      this.weight
    );
    this.lineChart.update();
  }

  ionViewDidEnter() {
    this.lineChartMethod();
  }

  lineChartMethod() {
    if(this.lineChart!=null){
      this.lineChart.clear();
      this.lineChart.destroy();
    }
    const data = Object.values(UserService.user.logs)
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(({ timestamp, weight }) => ({
        x: timestamp,
        y: weight,
      }));

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Weight Average (lb)',
            data: data,
            spanGaps: true,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
            title: {
              text: 'Date',
            },
            adapters: {
              date: {
                locale: enUS,
              },
            },
          },
        },
      },
    });
  }
}
