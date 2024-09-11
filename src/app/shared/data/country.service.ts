import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Countries } from '../types';

const apiUrl = 'https://api-paises.pages.dev/paises.json';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private dataSource = new BehaviorSubject<Countries[]>([]);

  public response = this.dataSource.asObservable();

  constructor() {
    this.getCountries();
  }

  getCountries() {
    this.http.get<Countries[]>(apiUrl).subscribe({
      next: (response) => {
        const countriesArr = [...Object.values(response)];
        const countries = countriesArr || [];
        this.dataSource.next(countries);
      },
      error: (err) => {
        console.error('Erro ao buscar países', err);
      },
    });
  }
}
