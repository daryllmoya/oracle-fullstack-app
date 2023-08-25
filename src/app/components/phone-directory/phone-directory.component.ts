import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

interface Contact {
  name: string;
  mobile: string;
  email: string;
}

@Component({
  selector: 'app-phone-directory',
  templateUrl: './phone-directory.component.html',
  styleUrls: ['./phone-directory.component.css'],
})
export class PhoneDirectoryComponent {
  dataSource: MatTableDataSource<Contact>;
  displayedColumns: string[] = ['name', 'mobile', 'email'];
  contacts: Contact[] = [];

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[A-Za-z ]{1,20}$'),
  ]);

  mobileFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{10}$'),
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
  ]);

  constructor() {
    this.dataSource = new MatTableDataSource(this.contacts);
  }

  addContact() {
    if (
      this.nameFormControl.valid &&
      this.mobileFormControl.valid &&
      this.emailFormControl.valid
    ) {
      this.contacts.push({
        name: this.nameFormControl.value || '',
        mobile: this.mobileFormControl.value || '',
        email: this.emailFormControl.value || '',
      });
      this.dataSource.data = this.contacts;
      this.clearForm();
    }
  }

  clearForm() {
    this.nameFormControl.reset();
    this.mobileFormControl.reset();
    this.emailFormControl.reset();
    this.nameFormControl.setErrors(null);
    this.mobileFormControl.setErrors(null);
    this.emailFormControl.setErrors(null);
    this.nameFormControl.markAsPristine();
    this.mobileFormControl.markAsPristine();
    this.emailFormControl.markAsPristine();
  }

  formIsValid(): boolean {
    return (
      this.nameFormControl.valid &&
      this.mobileFormControl.valid &&
      this.emailFormControl.valid
    );
  }

  isNameFieldOnError(): boolean {
    return (
      this.nameFormControl.invalid &&
      (this.nameFormControl.touched || this.nameFormControl.dirty)
    );
  }

  isMobileFieldOnError(): boolean {
    return (
      this.mobileFormControl.invalid &&
      (this.mobileFormControl.touched || this.mobileFormControl.dirty)
    );
  }

  isEmailFieldOnError(): boolean {
    return (
      this.emailFormControl.invalid &&
      (this.emailFormControl.touched || this.emailFormControl.dirty)
    );
  }
}
