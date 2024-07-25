import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersListService } from 'src/app/services/users-list.service';

interface IInfo {
  avatar_url: string,
  followers: string[],
  following: string[],
  public_repos: string[],
}

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  constructor(
    private usersService: UsersListService,
    private route: ActivatedRoute
  ) {
  }

  userInfo: Partial<IInfo> = {};
  private paramId: string = this.route.snapshot.params.id;

  ngOnInit(): void {
    this.getInfo();
    this.getFollowers();
    this.getFollowings();
    this.getRepos();
  }

  getInfo(): void {
    this.usersService.getUserInfo(this.paramId).subscribe((data) => {
      this.userInfo = {
        ...this.userInfo,
        avatar_url: data.avatar_url,
      };
    })
  }

  getFollowers(): void {
    this.usersService.getUserInfo(this.paramId, 'followers').subscribe((data) => {
      this.userInfo = {
        ...this.userInfo,
        followers: data.map(({ html_url }) => html_url)
      };
    })
  }

  getFollowings(): void {
    this.usersService.getUserInfo(this.paramId, 'following').subscribe((data) => {
      this.userInfo = {
        ...this.userInfo,
        following: data.map(({ html_url }) => html_url)
      };
    })
  }

  getRepos(): void {
    this.usersService.getUserInfo(this.paramId, 'repos').subscribe((data) => {
      this.userInfo = {
        ...this.userInfo,
        public_repos: data.map(({ git_url }) => git_url)
      };
    })
  }

}
