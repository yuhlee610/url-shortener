import { Component, signal } from "@angular/core";
import { ResultComponent } from "../../core/components/result/result.component";
import { UrlFormComponent } from "./components/url-form/url-form.component";
import { Url } from "../../models/url.model";

@Component({
  selector: "app-custom-urls",
  standalone: true,
  imports: [ResultComponent, UrlFormComponent],
  templateUrl: "./custom-urls.component.html",
  styleUrl: "./custom-urls.component.less",
})
export class CustomUrlsComponent {
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
