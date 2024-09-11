// /* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { CountryService } from './country.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { Countries } from '../types';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  const mockCountries: Countries[] = [
    { pais: 'Brasil', ddi: 55, img: 'image', continente: 'America' },
    { pais: 'Argentina', ddi: 112, img: 'image', continente: 'America' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService],
    });

    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
