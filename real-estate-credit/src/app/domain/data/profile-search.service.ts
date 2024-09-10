import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

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

  private isOnline() {
    if (!navigator.onLine) {
      this._snackBar.open('Sem conexão com a internet.', 'Close', {
        duration: 5000,
      });
    }
  }

  getUser(username: string): Observable<User> {
    this.isOnline();

    return this.http.get<User>(`${URL}/${username}`).pipe(
      catchError((err) => {
        this._snackBar.open('Erro ao tentar encontrar username.', 'Close', {
          duration: 5000,
        });
        return throwError(() => console.error(err));
      })
    );
  }

  getRepos(username: string): Observable<Repository[]> {
    this.isOnline();

    return this.http.get<Repository[]>(`${URL}/${username}/repos`).pipe(
      catchError((err) => {
        this._snackBar.open('Erro ao tentar encontrar repositório.', 'Close', {
          duration: 5000,
        });
        return throwError(() => console.error(err));
      })
    );
  }
}
