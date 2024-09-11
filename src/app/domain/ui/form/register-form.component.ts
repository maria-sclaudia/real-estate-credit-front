import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CountryService } from 'src/app/shared/data';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatSelectModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [provideNgxMask(), CountryService],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthdate: new FormControl('', [Validators.required]),
    ddiPhones: new FormArray([]),
    isForeign: new FormControl(),
    acceptTerms: new FormControl(false),
  });
  public dialog = inject(MatDialog);
  public countryService = inject(CountryService);
  public phoneMask: string = '';

  private router = inject(Router);

  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>;

  get ddiPhones(): FormArray {
    return this.form.get('ddiPhones') as FormArray;
  }

  ngOnInit() {
    this.addPhone();
  }

  createPhone(): FormGroup {
    return new FormGroup({
      ddi: new FormControl(null, [Validators.required]),
      phone: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    console.log('Formulario:', this.form.value);
  }

  onClear() {
    this.form.reset();
    this.ddiPhones.clear();
    this.addPhone();
  }

  onCancel() {
    this.router.navigate(['/menu']);
  }

  openDialog() {
    this.dialog.open(this.dialogContent);
  }

  onDDIChange(index: number) {
    const phoneControl = this.ddiPhones.at(index).get('phone') as FormControl;
    phoneControl.enable();
    phoneControl.reset();
  }

  addPhone(): void {
    this.ddiPhones.push(this.createPhone());
  }

  removePhone(index: number): void {
    this.ddiPhones.removeAt(index);
  }
}
