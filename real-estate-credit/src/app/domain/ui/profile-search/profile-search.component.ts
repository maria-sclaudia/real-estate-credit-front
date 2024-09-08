import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProfileSearchService } from '../../data';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
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
  ],
  providers: [ProfileSearchService],
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.scss'],
})
export class ProfileSearchComponent {
  public form = new FormControl('');
  public repos: Repository[] = [];
  public user?: User;
  public dataSource: Repository[] = [];

  private profileSearchService = inject(ProfileSearchService);

  constructor() {}

  ngOnInit() {}

  search() {
    if (!this.form.value) return;
    this.user = undefined;
    this.repos = [];
    // adc destroy
    this.profileSearchService.getUser(this.form.value).subscribe((user) => {
      this.user = user;
      console.log('user', this.user);
      if (!this.user) return;
      console.log('depois');
      this.profileSearchService
        .getRepos(this.form.value!)
        .subscribe((repos) => {
          this.repos = repos;
          this.dataSource = this.repos;
        });
    });
  }
}
