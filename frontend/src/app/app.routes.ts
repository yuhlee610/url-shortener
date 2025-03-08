import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { CustomUrlsComponent } from "./pages/custom-urls/custom-urls.component";
import { MyUrlsComponent } from "./pages/my-urls/my-urls.component";
import { TrackingComponent } from "./pages/tracking/tracking.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "signin",
    component: SignInComponent,
  },
  {
    path: "signup",
    component: SignUpComponent,
  },
  {
    path: "custom-urls",
    component: CustomUrlsComponent,
  },
  {
    path: "my-urls",
    component: MyUrlsComponent,
  },
  {
    path: "tracking/:id",
    component: TrackingComponent
  }
];
