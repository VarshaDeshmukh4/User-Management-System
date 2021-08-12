import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CreateUserComponent } from "./dashboard/create-user/create-user.component";
import { UpdateUserComponent } from "./dashboard/update-user/update-user.component";
import { ViewUserComponent } from "./dashboard/view-user/view-user.component";
import { AuthGuard } from "./authGuard/auth.guard";

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
   canActivate: [AuthGuard],
    children: [
      { path: "", component: ViewUserComponent },
      { path: "create", component: CreateUserComponent },
      { path: "update/:id", component: UpdateUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
