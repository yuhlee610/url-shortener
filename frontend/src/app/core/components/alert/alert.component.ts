import { Component } from "@angular/core";
import { TuiPopover } from "@taiga-ui/cdk/services";
import { TuiAlertOptions } from "@taiga-ui/core";
import { injectContext } from "@taiga-ui/polymorpheus";
import { ERROR_MESSAGE } from "../../constants/alert.constant";

@Component({
  selector: "app-alert",
  standalone: true,
  imports: [],
  templateUrl: "./alert.component.html",
  styleUrl: "./alert.component.less",
})
export class AlertComponent {
  protected readonly context =
    injectContext<TuiPopover<TuiAlertOptions<string>, boolean>>();
  protected message = this.context.data ?? ERROR_MESSAGE;
}
