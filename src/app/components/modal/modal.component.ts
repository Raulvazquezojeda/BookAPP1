import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { BookInterface } from '../../models/book';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  new:boolean;

  constructor(public dataApi: DataApiService) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;
  ngOnInit() {
    
  }

  onSaveBook(bookForm: NgForm): void {
    if (bookForm.value.id == null) {
      // New      
      bookForm.value.userUid = this.userUid;
      this.dataApi.addBook(bookForm.value);

    } else {
      // Update
      this.dataApi.updateBook(bookForm.value);
    }
    bookForm.resetForm();
    this.btnClose.nativeElement.click();
  }
  resetForm(formBook:NgForm): void {
    formBook.resetForm();

  }
}
