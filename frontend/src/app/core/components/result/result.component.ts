import { Component, inject, input, output, signal } from "@angular/core";
import { TuiAppearance, TuiButton, TuiIcon } from "@taiga-ui/core";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";
import { Url } from "../../../models/url.model";
import { FormBuilder, FormControl, ReactiveFormsModule } from "@angular/forms";
import { TuiInputModule } from "@taiga-ui/legacy";
import { SpaceDirective } from "../../directives/space/space.directive";

@Component({
  selector: "app-result",
  standalone: true,
  imports: [
    TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    ReactiveFormsModule,
    TuiInputModule,
    SpaceDirective,
    TuiButton,
    TuiIcon,
  ],
  templateUrl: "./result.component.html",
  styleUrl: "./result.component.less",
})
export class ResultComponent {
  private readonly fb = inject(FormBuilder);
  urlInfo = input<Pick<Url, "sourceUrl" | "destinationUrl"> | null>();
  back = output<void>();
  hasCopied = signal(false);
  form = this.fb.group({
    sourceUrl: new FormControl(),
    destinationUrl: new FormControl(),
  });

  ngOnInit() {
    this.form.setValue({
      sourceUrl: this.urlInfo()?.sourceUrl ?? null,
      destinationUrl: this.urlInfo()?.destinationUrl ?? null,
    });
    this.hasCopied.set(false);
  }

  onSubmit() {
    this.back.emit();
  }

  onCopy() {
    navigator.clipboard.writeText(this.urlInfo()?.destinationUrl as string);
    this.hasCopied.set(true);
  }
}
