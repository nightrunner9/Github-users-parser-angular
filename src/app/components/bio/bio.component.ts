import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { UsersListService } from 'src/app/services/users-list.service';
import { IInfo, IRepo } from './bio.types';
import { IUserRepos, IUsers } from 'src/app/models/users';
import { IError } from '../error/error.types';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})

export class BioComponent implements OnInit {

  constructor(
    private usersService: UsersListService,
    private route: ActivatedRoute,
    private errorHandler: ErrorComponent,
  ) { }

  avatar$!: Observable<string>;
  followers$!: Observable<IInfo[]>;
  following$!: Observable<IInfo[]>;
  repos$!: Observable<IRepo[]>;

  private paramId: string = this.route.snapshot.params.id;

  ngOnInit(): void {
    this.avatar$ = this.usersService.getUserInfo(this.paramId).pipe(
      map(({ avatar_url }) => avatar_url),
      catchError((err) => {
        console.log(err)
        this.errorHandler.handleError(err)

        return of('');
      })
    );

    this.followers$ = this.usersService.getUserInfo(this.paramId, 'followers').pipe(
      map((data: IUsers[]) => data.map((followerInfo) => ({
        avatar: followerInfo.avatar_url,
        url: followerInfo.html_url,
      })))
    );

    this.following$ = this.usersService.getUserInfo(this.paramId, 'following').pipe(
      map((data: IUsers[]) => data.map((followingInfo) => ({
        avatar: followingInfo.avatar_url,
        url: followingInfo.html_url,
      })))
    );

    this.repos$ = this.usersService.getUserInfo(this.paramId, 'repos').pipe(
      map((data: IUserRepos[]) => data.map(({ url, name }) => ({
        name,
        url
      })))
    );
  }

}
