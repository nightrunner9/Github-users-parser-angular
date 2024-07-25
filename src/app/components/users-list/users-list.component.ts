import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { IUsers } from 'src/app/models/users';
import { UsersListService } from 'src/app/services/users-list.service';

const INITIAL_FILTERS = {
  q: '',
  since: 0,
  per_page: 20,
};

interface IFilters {
  q?: string,
  since?: number,
  per_page?: number,
};

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {
  // @ViewChild('filterInput') inp: ElementRef | undefined;

  constructor(
    private usersService: UsersListService,
  ) {}

  users: IUsers[] = [];
  filters: IFilters = INITIAL_FILTERS;

  ngOnInit(): void {
    this.loadUsers()

    // console.log(this.inp)
    // fromEvent(filterInput, 'input')
  }

  // public ngAfterViewInit(): void {
  //   fromEvent(this.inp?.nativeElement, 'input').subscribe(() => {
  //     return true;
  //   })
  // }

  private loadUsers(): void {
    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  private searchUsers(search: string): void {
    this.usersService.searchUsers(search).subscribe((data) => {
      this.users = data.items;
    })
  }

  onChangeFilter(filter: IFilters): void {
    this.filters = {...this.filters, ...filter};

    ('q' in filter && filter.q?.length) ? this.searchUsers(filter.q) : this.loadUsers()
  }

}
