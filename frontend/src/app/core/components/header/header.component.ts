import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiButton, TuiLink } from "@taiga-ui/core";
import { TuiNavigation } from "@taiga-ui/layout";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [TuiNavigation, RouterLink, TuiLink, TuiButton],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.less",
})
export class HeaderComponent {
  private authService = inject(AuthService);

  get isAuthenticated() {
    return this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout().subscribe();
  }
}
