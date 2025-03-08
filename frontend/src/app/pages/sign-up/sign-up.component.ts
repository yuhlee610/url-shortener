import { Component, DestroyRef, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import {
  TuiAlertService,
  TuiAppearance,
  TuiButton,
  TuiError,
} from "@taiga-ui/core";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";
import { SpaceDirective } from "../../core/directives/space/space.directive";
import { TuiInputModule } from "@taiga-ui/legacy";
import { TuiButtonLoading, tuiValidationErrorsProvider } from "@taiga-ui/kit";
import { TuiFieldErrorPipe } from "@taiga-ui/kit";
import { AsyncPipe } from "@angular/common";
import { catchError, finalize, of, takeUntil, tap } from "rxjs";
import { AuthService } from "../../core/services/auth.service";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { AlertComponent } from "../../core/components/alert/alert.component";
import { ERROR_LABEL } from "../../core/constants/alert.constant";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-sign-up",
  standalone: true,
  imports: [
    TuiAppearance,
    TuiCardLarge,
    ReactiveFormsModule,
    TuiHeader,
    SpaceDirective,
    TuiInputModule,
    TuiButton,
    TuiButtonLoading,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiError,
  ],
  templateUrl: "./sign-up.component.html",
  styleUrl: "./sign-up.component.less",
  providers: [
    tuiValidationErrorsProvider({
      required: "This field is required",
      minlength: ({ requiredLength }: { requiredLength: string }) =>
        of(`The password min length is ${requiredLength}`),
    }),
  ],
})
export class SignUpComponent {
  private readonly authService = inject(AuthService);
  private readonly alerts = inject(TuiAlertService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  private readonly notification = this.alerts
    .open(new PolymorpheusComponent(AlertComponent), {
      label: ERROR_LABEL,
      appearance: "negative",
      autoClose: 5000,
    })
    .pipe(takeUntil(inject(Router).events));
  private formBuilder = inject(FormBuilder);
  signupForm = this.formBuilder.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
    name: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });
  loading = signal(false);

  onSubmit() {
    const email = this.signupForm.value.email as string;
    const password = this.signupForm.value.password as string;
    const name = this.signupForm.value.name as string;
    this.loading.set(true);

    this.authService
      .signup({ email, password, name })
      .pipe(
        tap(() => {
          this.router.navigate(["signin"]);
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
