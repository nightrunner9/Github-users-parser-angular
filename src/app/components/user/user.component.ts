import { Component, Input, OnInit } from '@angular/core';
import { IUsers } from 'src/app/models/users';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor() { }

  @Input() user!: IUsers

  ngOnInit(): void {
  }

}
