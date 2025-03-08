import { Component, DestroyRef, inject, input, signal } from "@angular/core";
import { TrackingService } from "../../core/services/tracking.service";
import { TuiAlertService } from "@taiga-ui/core";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { AlertComponent } from "../../core/components/alert/alert.component";
import { ERROR_LABEL } from "../../core/constants/alert.constant";
import { catchError, finalize, takeUntil, tap } from "rxjs";
import { Router } from "@angular/router";
import { Tracking } from "../../models/tracking.model";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TuiTabs } from "@taiga-ui/kit";
import { DateTabComponent } from "./components/date-tab/date-tab.component";
import { MonthTabComponent } from "./components/month-tab/month-tab.component";
import { SpaceDirective } from "../../core/directives/space/space.directive";

@Component({
  selector: "app-tracking",
  standalone: true,
  imports: [TuiTabs, DateTabComponent, MonthTabComponent, SpaceDirective],
  templateUrl: "./tracking.component.html",
  styleUrl: "./tracking.component.less",
})
export class TrackingComponent {
  private readonly trackingService = inject(TrackingService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly alerts = inject(TuiAlertService);
  private readonly notification = this.alerts
    .open(new PolymorpheusComponent(AlertComponent), {
      label: ERROR_LABEL,
      appearance: "negative",
      autoClose: 5000,
    })
    .pipe(takeUntil(inject(Router).events));

  id = input.required<number>();
  loading = signal(false);
  result = signal<Tracking[] | null>(null);
  activeItemIndex = 0;

  fetchData(from: Date, to: Date) {
    this.loading.set(true);
    const type = this.activeItemIndex === 0 ? "date" : "month";
    return this.trackingService.getTrackingByUrlId(this.id(), from, to, type).pipe(
      tap((response) => {
        this.result.set(response.data.statistics);
      }),
      catchError((error) => {
        console.log(error);
        return this.notification;
      }),
      finalize(() => this.loading.set(false)),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  submit({ from, to }: { from: Date; to: Date }) {
    this.fetchData(from, to).subscribe();
  }

  switchTab(index: number) {
    if (index === this.activeItemIndex) {
      return;
    }
    this.result.set(null);
  }
}
