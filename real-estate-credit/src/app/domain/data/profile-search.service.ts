import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ENVIRONMENT } from 'src/environments/environment';
import { User, Repository } from '../types';

const URL = `${ENVIRONMENT.gitHubURL}/users`;

@Injectable({
  providedIn: 'root',
})
export class ProfileSearchService {
  private http = inject(HttpClient);

  getUser(username: string): Observable<User> {
    return this.http.get<User>(`${URL}/${username}`);
  }

  getRepos(username: string): Observable<Repository[]> {
    return this.http.get<Repository[]>(`${URL}/${username}/repos`);
  }
}
