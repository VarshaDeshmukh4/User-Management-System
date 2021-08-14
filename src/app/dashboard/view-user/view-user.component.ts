import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { User } from "../../model/user";
import { MatPaginator } from "@angular/material/paginator";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-view-user",
  templateUrl: "./view-user.component.html",
  styleUrls: ["./view-user.component.css"],
})
export class ViewUserComponent implements OnInit {
  UserData: any = [];
  userId: any;
  isCheckUser: boolean;
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    "id",
    "name",
    "email",
    "address",
    "phone",
    "age",
    "action",
  ];
  constructor(
    private UserService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "user") {
      console.log(this.userId);
      this.isCheckUser = false;
    } else if (userRole === "Admin") {
      this.isCheckUser = true;
    }
    console.log(userRole);
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.UserService.getUser().subscribe((res) => {
      this.UserData = res;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  deleteUser(pageIndex: number, e) {
    if (window.confirm("Are you sure")) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + pageIndex,
        1
      );
      this.dataSource.data = data;
      this.UserService.deleteUser(e._id).subscribe();
    }
  }

  addUser() {
    this.router.navigate(["/dashboard/create"]);
  }
}
