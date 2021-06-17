import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { UserInterface } from '../../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {

  new:boolean;
  roles: any[] = [
    { admin: true },
    { editor: true}
    ];
  constructor(public dataApi: DataApiService) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;
  ngOnInit() {
    console.log("ENTROo");
  }

  onSaveUser(userForm: NgForm): void {
    if (userForm.value.id == null) {
      // New      
      userForm.value.id = this.userUid;
      this.dataApi.addUser(userForm.value);
    } else {
      // Update
      this.dataApi.updateUser(userForm.value);
    }
    userForm.resetForm();
    this.btnClose.nativeElement.click();
  }
  resetForm(formUser:NgForm): void {
    formUser.resetForm();

  }

}
