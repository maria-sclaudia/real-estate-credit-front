import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GithubValidator } from 'src/app/shared/helpers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { ProfileSearchService } from '../../data';
import { Repository, RepositorySort, SortDirection, User } from '../../types';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';

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
    MatSortModule,
  ],
  providers: [ProfileSearchService, MatSnackBar],
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.scss'],
})
export class ProfileSearchComponent {
  public form = new FormControl('', [GithubValidator.usernameValidator]);
  public repos: Repository[] = [];
  public user?: User;
  public dataSource = new MatTableDataSource<Repository>([]);
  public profileSearchService = inject(ProfileSearchService);

  private _liveAnnouncer = inject(LiveAnnouncer);
  private destroy$ = new Subject<void>();

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (!this.form.value) return;

    if (sortState.direction) {
      const sort: RepositorySort = {
        column: sortState.active,
        direction: sortState.direction,
      };

      this.getRepos(this.form.value, sort);
    } else {
      this.getRepos(this.form.value);
    }
  }

  search() {
    if (!this.form.value) return;
    this.user = undefined;
    this.repos = [];
    this.dataSource.data = [];

    this.profileSearchService
      .getUser(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.user = user;
        if (this.user) this.getRepos(this.user.login);
      });
  }

  private getRepos(username: string, sort?: RepositorySort) {
    this.profileSearchService
      .getRepos(username, sort)
      .pipe(takeUntil(this.destroy$))
      .subscribe((repos) => {
        this.repos = repos;
        this.dataSource.data = repos;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
