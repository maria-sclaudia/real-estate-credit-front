import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatTableModule } from '@angular/material/table';
import { GithubValidator } from 'src/app/shared/helpers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { ProfileSearchService } from '../../data';
import { Repository, User } from '../../types';

@Component({
  selector: 'profile-search',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  providers: [ProfileSearchService, MatSnackBar],
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.scss'],
})
export class ProfileSearchComponent {
  public form = new FormControl('', [GithubValidator.usernameValidator]);
  public repos: Repository[] = [];
  public user?: User;
  public dataSource: Repository[] = [];
  public profileSearchService = inject(ProfileSearchService);

  private destroy$ = new Subject<void>();

  search() {
    if (!this.form.value) return;
    this.user = undefined;
    this.repos = [];

    this.profileSearchService
      .getUser(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.user = user;
      });
    this.profileSearchService
      .getRepos(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((repos) => {
        this.repos = repos;
        this.dataSource = repos;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
