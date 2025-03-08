import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { Url } from "../../models/url.model";
import { UrlsService } from "../../core/services/urls.service";
import {
  TuiAlertService,
  TuiLoader,
  tuiLoaderOptionsProvider,
} from "@taiga-ui/core";
import { catchError, finalize, switchMap, takeUntil, tap } from "rxjs";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { AlertComponent } from "../../core/components/alert/alert.component";
import { ERROR_LABEL } from "../../core/constants/alert.constant";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { UrlsTableComponent } from "./components/urls-table/urls-table.component";
import { Metadata } from "../../models/response.model";
import { TuiTablePaginationEvent } from "@taiga-ui/addon-table";

@Component({
  selector: "app-my-urls",
  standalone: true,
  imports: [UrlsTableComponent, TuiLoader],
  templateUrl: "./my-urls.component.html",
  styleUrl: "./my-urls.component.less",
  providers: [
    tuiLoaderOptionsProvider({
      size: "m",
      inheritColor: false,
      overlay: true,
    }),
  ],
})
export class MyUrlsComponent implements OnInit {
  private readonly urlsService = inject(UrlsService);
  private readonly alerts = inject(TuiAlertService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly notification = this.alerts
    .open(new PolymorpheusComponent(AlertComponent), {
      label: ERROR_LABEL,
      appearance: "negative",
      autoClose: 5000,
    })
    .pipe(takeUntil(inject(Router).events));

  loading = signal(false);
  urls = signal<Url[] | null>(null);
  metadata = signal<Metadata | null>(null);
  size = 10;

  fetchUrls(page: number, limit: number) {
    return this.urlsService.getMyUrls(page, limit).pipe(
      tap((response) => {
        this.urls.set(response.data.urls);
        this.metadata.set(response.metadata);
      }),
      catchError((error) => {
        console.log(error);
        return this.notification;
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  ngOnInit() {
    this.loading.set(true);
    this.fetchUrls(1, this.size)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe();
  }

  onPagination({ page, size }: TuiTablePaginationEvent) {
    this.size = size;
    this.loading.set(true);
    this.fetchUrls(page + 1, size)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe();
  }

  onDelete(id: number) {
    this.loading.set(true);
    this.urlsService
      .deleteUrl(id)
      .pipe(
        switchMap(() => this.fetchUrls(this.metadata()?.page ?? 1, this.size)),
        catchError((error) => {
          console.log(error);
          return this.notification;
        }),
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
