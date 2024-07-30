import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, Input, OnInit } from '@angular/core';
import { IError, IErrorType } from './error.types';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {

  constructor() { }

  @Input() error: IErrorType;

  ngOnInit(): void {
  }
}
