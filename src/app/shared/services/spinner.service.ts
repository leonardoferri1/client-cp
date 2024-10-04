import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinnerState = new BehaviorSubject<boolean>(false);

  constructor() {}

  setSpinnerState(state: boolean) {
    this.spinnerState.next(state);
  }

  getSpinnerState(): Observable<boolean> {
    return this.spinnerState.asObservable();
  }
}
