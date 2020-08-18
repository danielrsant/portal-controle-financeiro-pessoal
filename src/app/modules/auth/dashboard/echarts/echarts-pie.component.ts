import { AfterViewInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};

  constructor() {
  }

  ngAfterViewInit() {
      this.options = {
        backgroundColor: 'white',
        color: ['orange', 'blue', 'red', 'green', 'purple'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['USA', 'Germany', 'France', 'Canada', 'Russia'],
          textStyle: {
            color: 'black',
          },
        },
        series: [
          {
            name: 'Countries',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: 'Germany' },
              { value: 310, name: 'France' },
              { value: 234, name: 'Canada' },
              { value: 135, name: 'Russia' },
              { value: 1548, name: 'USA' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'black',
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: 'black',
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'black',
                },
              },
            },
          },
        ],
      };
  }

  ngOnDestroy(): void {
  }
}
