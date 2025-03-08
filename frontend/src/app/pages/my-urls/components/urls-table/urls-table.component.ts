import { Component, input, output } from "@angular/core";
import { Url } from "../../../../models/url.model";
import {
  TuiTable,
  TuiTablePagination,
  TuiTablePaginationEvent,
} from "@taiga-ui/addon-table";
import { TuiButton, TuiLink } from "@taiga-ui/core";
import { DatePipe, NgFor } from "@angular/common";
import { Metadata } from "../../../../models/response.model";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-urls-table",
  standalone: true,
  imports: [
    TuiTable,
    TuiLink,
    DatePipe,
    NgFor,
    TuiTablePagination,
    TuiButton,
    RouterLink,
  ],
  templateUrl: "./urls-table.component.html",
  styleUrl: "./urls-table.component.less",
})
export class UrlsTableComponent {
  urls = input<Url[] | null>(null);
  metadata = input<Metadata | null>(null);
  paginate = output<TuiTablePaginationEvent>();
  delete = output<number>();

  onPagination(event: TuiTablePaginationEvent) {
    this.paginate.emit(event);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
