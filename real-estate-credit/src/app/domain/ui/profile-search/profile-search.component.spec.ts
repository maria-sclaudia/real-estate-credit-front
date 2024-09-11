/* tslint:disable:no-unused-variable */
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ProfileSearchComponent } from './profile-search.component';
import { ProfileSearchService } from '../../data';
import { User, Repository } from '../../types';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ProfileSearchComponent', () => {
  let component: ProfileSearchComponent;
  let fixture: ComponentFixture<ProfileSearchComponent>;
  let profileSearchService: jasmine.SpyObj<ProfileSearchService>;
  let httpTestingController: HttpTestingController;

  const mockUser: User = {
    name: 'Mock User',
    login: 'mock-user',
    followers: 2,
    following: 2,
    location: 'Brasil',
    avatar_url: 'https://avatars.com/22',
    bio: 'Mock bio',
  };

  const mockRepos: Repository[] = [
    {
      name: 'Mock Repo',
      html_url: 'https://github.com/mock-user/mock',
      stargazers_count: 5,
    },
    {
      name: 'Mock Repo 2',
      html_url: 'https://github.com/mock-user/mock2',
      stargazers_count: 3,
    },
  ];

  beforeEach(async () => {
    const profileSearchServiceSpy = jasmine.createSpyObj(
      'ProfileSearchService',
      ['getUser', 'getRepos']
    );

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ProfileSearchComponent,
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        ProfileSearchService,
        { provide: ProfileSearchService, useValue: profileSearchServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSearchComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    profileSearchService = TestBed.inject(
      ProfileSearchService
    ) as jasmine.SpyObj<ProfileSearchService>;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call service methods if form value is empty', () => {
    component.form.setValue('');

    component.search();

    expect(profileSearchService.getUser).not.toHaveBeenCalled();
    expect(profileSearchService.getRepos).not.toHaveBeenCalled();
  });

  it('should call service methods user and repos', () => {
    const username = 'mock-user';
    component.form.setValue(username);

    component.profileSearchService = profileSearchService;

    profileSearchService.getUser.and.returnValue(of(mockUser));
    profileSearchService.getRepos.and.returnValue(of(mockRepos));

    component.search();

    expect(profileSearchService.getUser).toHaveBeenCalledWith(username);
    expect(profileSearchService.getRepos).toHaveBeenCalledWith(username);

    expect(component.user).toEqual(mockUser);
    expect(component.repos).toEqual(mockRepos);
    expect(component.dataSource).toEqual(mockRepos);
  });

  it('should reset user and repos before calling the service', () => {
    component.form.setValue('otheruser');

    profileSearchService.getUser.and.returnValue(of());
    profileSearchService.getRepos.and.returnValue(of([]));

    component.search();

    expect(component.user).toBeUndefined();
    expect(component.repos).toEqual([]);
  });

  it('should clean up resources on destroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });
});
