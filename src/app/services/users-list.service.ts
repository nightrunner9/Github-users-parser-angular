import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ISearchUsersResponse, IUsers, UserApiType } from '../models/users';

const headers = new HttpHeaders ({
  "Authorization": "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",
  "X-GitHub-Api-Version": "2022-11-28",
})

@Injectable({
  providedIn: 'root'
})

export class UsersListService {
  constructor(
    private http: HttpClient,
  ) {}

  getUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>('https://api.github.com/users', {
      headers: headers,
      params: {
        per_page: 20,
        since: 0
      },
    });
  }

  searchUsers(q: string): Observable<ISearchUsersResponse> {
    return this.http.get<ISearchUsersResponse>('https://api.github.com/search/users', {
      headers: headers,
      params: {
        q
      }
    });
  }

  getUserInfo(login: string, url?: string): Observable<UserApiType> {
    const urlPart = url ? `${login}/${url}` : `${login}`;

    return this.http.get<UserApiType>(`https://api.github.com/users/${urlPart}`, {
      headers: headers,
    });
  }
}
