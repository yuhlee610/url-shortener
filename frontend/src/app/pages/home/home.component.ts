import { Component, signal } from "@angular/core";
import { UrlFormComponent } from "./components/url-form/url-form.component";
import { Url } from "../../models/url.model";
import { ResultComponent } from "../../core/components/result/result.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [UrlFormComponent, ResultComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.less",
})
export class HomeComponent {
  canShortenAnotherUrl = signal(false);
  urlInfo = signal<Pick<Url, "sourceUrl" | "destinationUrl"> | null>(null);

  onCreateSuccess(url: Url) {
    this.canShortenAnotherUrl.set(true);
    this.urlInfo.set({
      sourceUrl: url.sourceUrl,
      destinationUrl: url.destinationUrl,
    });
  }

  shortenAnotherUrl() {
    this.canShortenAnotherUrl.set(false);
  }
}
