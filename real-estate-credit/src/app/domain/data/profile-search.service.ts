import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  throwError,
} from 'rxjs';

import { ENVIRONMENT } from 'src/environments/environment';
import { User, Repository } from '../types';
import { MatSnackBar } from '@angular/material/snack-bar';

const URL = `${ENVIRONMENT.gitHubURL}/users`;

@Injectable({
  providedIn: 'root',
})
export class ProfileSearchService {
  private http = inject(HttpClient);
  private _snackBar = inject(MatSnackBar);
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  private isOnline(): boolean {
    if (!navigator.onLine) {
      this._snackBar.open('Sem conexão com a internet.', 'Close', {
        duration: 5000,
      });
      return false;
    }
    return true;
  }

  getUser(username: string): Observable<User> {
    if (!this.isOnline()) {
      return throwError(() => new Error('Sem conexão com a internet.'));
    }
    this.isLoading.next(true);

    return this.http.get<User>(`${URL}/${username}`).pipe(
      finalize(() => this.isLoading.next(false)),
      catchError((err) => {
        this._snackBar.open('Erro ao tentar encontrar username.', 'Close', {
          duration: 5000,
        });
        return throwError(() => console.error(err));
      })
    );
  }

  getRepos(username: string): Observable<Repository[]> {
    if (!this.isOnline()) {
      return throwError(() => new Error('Sem conexão com a internet.'));
    }
    this.isLoading.next(true);

    return this.http.get<Repository[]>(`${URL}/${username}/repos`).pipe(
      finalize(() => this.isLoading.next(false)),
      catchError((err) => {
        this._snackBar.open('Erro ao tentar encontrar repositório.', 'Close', {
          duration: 5000,
        });
        return throwError(() => console.error(err));
      })
    );
  }
}
