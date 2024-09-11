/* tslint:disable:no-unused-variable */
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { ProfileSearchService } from './profile-search.service';
import { Repository, User } from '../types';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('ProfileSearch', () => {
  let service: ProfileSearchService;
  let httpMock: HttpTestingController;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

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
  ];

  const mockENVIRONMENT = 'https://api.github.com';

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        ProfileSearchService,
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    });

    service = TestBed.inject(ProfileSearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return success when search username', () => {
    const username = 'mock-user';

    service.getUser(username).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${mockENVIRONMENT}/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should return error when search username', () => {
    const username = 'otheruser';

    spyOn(console, 'error');

    service.getUser(username).subscribe(
      () => fail('expected an error'),
      (error) => {
        console.log('Error received:', error);
        expect(error).toBe(error);
        expect(console.error).toHaveBeenCalled();
      }
    );

    const req = httpMock.expectOne(`${mockENVIRONMENT}/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush('Erro ao tentar encontrar username.', {
      status: 404,
      statusText: 'Not Found',
    });
  });

  it('should return success when find repositories', () => {
    const username = 'mock-user';

    service.getRepos(username).subscribe((repos) => {
      expect(repos.length).toBe(1);
      expect(repos).toEqual(mockRepos);
    });

    const req = httpMock.expectOne(
      `${mockENVIRONMENT}/users/${username}/repos`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });

  it('should return error when find repositories', () => {
    const username = 'other-user';

    spyOn(console, 'error');

    service.getRepos(username).subscribe(
      () => fail('expected an error'),
      (error) => {
        console.log('Error received:', error);
        expect(error).toBe(error);
        expect(console.error).toHaveBeenCalled();
      }
    );

    const req = httpMock.expectOne(
      `${mockENVIRONMENT}/users/${username}/repos`
    );
    expect(req.request.method).toBe('GET');
    req.flush('Erro ao tentar encontrar repositório', {
      status: 404,
      statusText: 'Not Found',
    });
  });

  it('should show offline error when there is no internet', () => {
    spyOnProperty(navigator, 'onLine', 'get').and.returnValue(false);

    service.getUser('otheruser').subscribe(
      () => fail('expected an error'),
      (error) => {
        expect(error.message).toBe('Sem conexão com a internet.');
      }
    );

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Sem conexão com a internet.',
      'Close',
      { duration: 5000 }
    );
  });
});
