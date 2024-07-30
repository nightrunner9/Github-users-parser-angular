import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, combineLatest, map, of, zip } from 'rxjs';
import { UsersListService } from 'src/app/services/users-list.service';
import { IInfo, IRepo } from './bio.types';
import { IUserRepos, IUsers } from 'src/app/models/users';
import { IError, IErrorType } from '../error/error.types';
import { ErrorComponent } from '../error/error.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})

export class BioComponent implements OnInit {

  constructor(
    private usersService: UsersListService,
    private route: ActivatedRoute,
  ) { }

  // model: {
  //   data: 
  //   status: 
  // }

  avatar$: Observable<string>;
  followers$: Observable<IInfo[]>;
  following$: Observable<IInfo[]>;
  repos$: Observable<IRepo[]>;

  error: IErrorType = null;

  private paramId: string = this.route.snapshot.params.id;

  ngOnInit(): void {
    combineLatest([
      this.getAvatar(),
      this.getFollowers(),
      this.getFollowings(),
      this.getRpositories(),
    ]).pipe(

    ).subscribe({
      next: (res) => console.log(res),
      error: ({ status, message }: HttpErrorResponse) => {this.error = { status, message }; return of('')},}
    )
  }

  getAvatar() {
    return this.avatar$ = this.usersService.getUserInfo(this.paramId).pipe(
      map(({ avatar_url }) => avatar_url)
    )
  };

  getFollowers() {
    return this.followers$ = this.usersService.getUserInfo(this.paramId, 'followers').pipe(
      map((data: IUsers[]) => data.map((followerInfo) => ({
        img: followerInfo.avatar_url,
        url: followerInfo.html_url,
      })))
    )
  };

  getFollowings() {
    return this.following$ = this.usersService.getUserInfo(this.paramId, 'following').pipe(
      map((data: IUsers[]) => data.map((followingInfo) => ({
        img: followingInfo.avatar_url,
        url: followingInfo.html_url,
      })))
    )
  };

  getRpositories() {
    return this.repos$ = this.usersService.getUserInfo(this.paramId, 'repos').pipe(
      map((data: IUserRepos[]) => data.map(({ html_url: url, name }) => ({
        name,
        url
      })))
    )
  };
}
