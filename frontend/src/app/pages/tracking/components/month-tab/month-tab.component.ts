import {
  Component,
  effect,
  input,
  output,
  signal,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TuiDay, TuiMonthRange } from "@taiga-ui/cdk/date-time";
import { TuiButton } from "@taiga-ui/core";
import {
  TuiInputMonthRangeModule,
  TuiTextfieldControllerModule,
} from "@taiga-ui/legacy";
import { SpaceDirective } from "../../../../core/directives/space/space.directive";
import { convertTuiMonthToDate } from "../../../../core/utils";
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
import { Tracking } from "../../../../models/tracking.model";

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
  selector: "app-month-tab",
  standalone: true,
  imports: [
    FormsModule,
    TuiInputMonthRangeModule,
    TuiTextfieldControllerModule,
    TuiButton,
    SpaceDirective,
    NgApexchartsModule,
  ],
  templateUrl: "./month-tab.component.html",
  styleUrl: "./month-tab.component.less",
})
export class MonthTabComponent {
  @ViewChild("chart") chart!: ChartComponent;
  chartOptions!: ChartOptions;
  range = signal<TuiMonthRange | null>(null);
  submit = output<{ from: Date; to: Date }>();
  result = input<Tracking[] | null>(null);

  now = new Date();
  max = new TuiDay(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());

  constructor() {
    effect(() => {
      const result = this.result();
      const [values, categories] = result
        ? result.reduce(
            ([values, categories], item) => {
              return [
                [...values, +item.visitCount],
                [...categories, this.formatDate(item.date)],
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
      });
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

  formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "2-digit",
      year: "numeric",
    });
  }

  onSubmit() {
    const from = this.range()?.from;
    const to = this.range()?.to;
    if (!from || !to) return;

    this.submit.emit({
      from: convertTuiMonthToDate(from),
      to: convertTuiMonthToDate(to),
    });
  }
}
