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
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ErrorComponent implements OnInit {
  error$ = new BehaviorSubject<IError | null>(null);

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  // @Input() handleError!: IError;

  ngOnInit(): void {
  }

  handleError({ status, message }: HttpErrorResponse) {
    this.error$.next({
      status,
      message,
    })
    console.log(this.error$)
    this.changeDetectorRef.detectChanges();
  }


}
