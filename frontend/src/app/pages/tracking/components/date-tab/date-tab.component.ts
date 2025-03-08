import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TuiDay, TuiDayLike, TuiDayRange } from "@taiga-ui/cdk/date-time";
import { TuiButton } from "@taiga-ui/core";
import {
  TuiInputDateRangeModule,
  TuiTextfieldControllerModule,
} from "@taiga-ui/legacy";
import { SpaceDirective } from "../../../../core/directives/space/space.directive";
import { convertTuiDayToDate } from "../../../../core/utils";
import { Tracking } from "../../../../models/tracking.model";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  NgApexchartsModule,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-date-tab",
  standalone: true,
  imports: [
    TuiInputDateRangeModule,
    FormsModule,
    TuiTextfieldControllerModule,
    TuiButton,
    SpaceDirective,
    NgApexchartsModule,
  ],
  templateUrl: "./date-tab.component.html",
  styleUrl: "./date-tab.component.less",
})
export class DateTabComponent {
  @ViewChild("chart") chart!: ChartComponent;
  chartOptions!: ChartOptions;
  range = signal<TuiDayRange | null>(null);
  submit = output<{ from: Date; to: Date }>();
  result = input<Tracking[] | null>(null);
  
  now = new Date();
  maxLength: TuiDayLike = { month: 1 };
  max = new TuiDay(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());

  constructor() {
    effect(() => {
      const result = this.result();
      const [values, categories] = result
        ? result.reduce(
            ([values, categories], item) => {
              return [
                [...values, +item.visitCount],
                [...categories, new Date(item.date).toLocaleDateString()],
              ];
            },
            [[], []] as [number[], string[]]
          )
        : [[], []];

      this.chart.updateSeries([
        {
          name: "Visit count",
          data: values,
        },
      ]);

      this.chart.updateOptions({
        xaxis: {
          categories,
        },
      })
    });

    this.initChart();
  }

  initChart() {
    this.chartOptions = {
      series: [
        {
          name: "Visit count",
          data: [],
        },
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Visit count per date",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
      },
    };
  }

  onSubmit() {
    this.submit.emit({
      from: convertTuiDayToDate(this.range()?.from as TuiDay),
      to: convertTuiDayToDate(this.range()?.to as TuiDay),
    });
  }
}
