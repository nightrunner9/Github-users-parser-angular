import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, filter, fromEvent } from 'rxjs';
import { IUsers } from 'src/app/models/users';
import { UsersListService } from 'src/app/services/users-list.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {
  @ViewChild('filterInput') searchInput: ElementRef | undefined;

  constructor(
    private usersService: UsersListService,
  ) {}

  users: IUsers[] = [];

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput?.nativeElement, 'input').pipe(
      debounceTime(500),
      filter(() => this.searchInput?.nativeElement.value.length),
    ).subscribe(() => {
      this.searchUsers(this.searchInput?.nativeElement.value);
    })
  }

  private searchUsers(search: string): void {
    this.usersService.searchUsers(search).subscribe((data) => {
      this.users = data.items;
    })
  }
}
