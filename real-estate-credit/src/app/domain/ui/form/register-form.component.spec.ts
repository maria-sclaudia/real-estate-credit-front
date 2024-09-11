// /* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/shared/data';
import { NO_ERRORS_SCHEMA, TemplateRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockCountryService: jasmine.SpyObj<CountryService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockCountryService = jasmine.createSpyObj('CountryService', [
      'getCountries',
    ]);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        NoopAnimationsModule,
        RegisterFormComponent,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CountryService, useValue: mockCountryService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clean the form', () => {
    component.onClear();

    const formValues = component.form.value;
    expect(formValues.name).toEqual(null);
    expect(formValues.email).toEqual(null);
    expect(formValues.birthdate).toEqual(null);
    expect(formValues.acceptTerms).toEqual(null);
    expect(formValues.ddiPhones?.length).toEqual(1);
  });

  it('should navigate on cancel', () => {
    component.onCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/menu']);
  });

  it('should initialize with one phone', () => {
    expect(component.ddiPhones.length).toBe(1);
  });

  it('should add a phone', () => {
    component.addPhone();
    expect(component.ddiPhones.length).toBe(2);
    component.addPhone();
    expect(component.ddiPhones.length).toBe(3);
  });

  it('should remove a phone', () => {
    component.removePhone(0);
    expect(component.ddiPhones.length).toBe(0);
  });
});
