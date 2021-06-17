import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { UserInterface } from '../../../models/user';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public dataApi: DataApiService, private authService: AuthService) { }
  public users: UserInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListUsers();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        })
      }
    })
  }

  getListUsers() {
    this.dataApi.getAllUsers()
      .subscribe(users => {
        this.users = users;
      });
  }
  onDeleteUser(idUser: string): void {
    const confirmacion = confirm('Are you sure?');
    if (confirmacion) {
      this.dataApi.deleteUser(idUser);
    }
  }

  onPreUpdateUser(user: UserInterface) {
    console.log('USER', user);
    this.dataApi.selectedUser = Object.assign({}, user);
  }
}
