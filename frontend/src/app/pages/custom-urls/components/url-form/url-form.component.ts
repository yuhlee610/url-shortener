import { Component, DestroyRef, inject, output, signal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  TuiAlertService,
  TuiAppearance,
  TuiButton,
  TuiError,
} from "@taiga-ui/core";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";
import { TuiInputModule } from "@taiga-ui/legacy";
import { pathValidator, urlValidator } from "../../../../core/validator";
import { UrlsService } from "../../../../core/services/urls.service";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { AlertComponent } from "../../../../core/components/alert/alert.component";
import { ERROR_LABEL } from "../../../../core/constants/alert.constant";
import { catchError, finalize, takeUntil, tap } from "rxjs";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Url } from "../../../../models/url.model";
import { AsyncPipe } from "@angular/common";
import {
  TuiButtonLoading,
  TuiFieldErrorPipe,
  tuiValidationErrorsProvider,
} from "@taiga-ui/kit";
import { SpaceDirective } from "../../../../core/directives/space/space.directive";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: "app-url-form",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiButton,
    TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    AsyncPipe,
    TuiError,
    TuiFieldErrorPipe,
    TuiButtonLoading,
    SpaceDirective,
  ],
  templateUrl: "./url-form.component.html",
  styleUrl: "./url-form.component.less",
  providers: [
    tuiValidationErrorsProvider({
      required: "Please enter a url",
      invalidUrl: "Must enter a url format input",
      invalidPath: "Must enter a valid path"
    }),
  ],
})
export class UrlFormComponent {
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
  onCreateSuccess = output<Url>();
  urlForm = new FormGroup({
    domain: new FormControl(environment.domain),
    sourceUrl: new FormControl("", [Validators.required, urlValidator]),
    path: new FormControl("", [Validators.required, pathValidator]),
  });
  loading = signal(false);

  onSubmit() {
    const { sourceUrl, domain, path } = this.urlForm.value;
    if (!sourceUrl) return;

    this.loading.set(true);
    this.urlsService
      .createUrl({ sourceUrl, destinationUrl: `${domain}${path}` })
      .pipe(
        tap((response) => {
          this.onCreateSuccess.emit(response.data);
        }),
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
