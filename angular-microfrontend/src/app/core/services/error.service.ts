import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorMessage = new BehaviorSubject<string | null>(null);
  errorMessage$ = this.errorMessage.asObservable();

  setError(message: string) {
    this.errorMessage.next(message);
  }

  clearError() {
    this.errorMessage.next(null);
  }
}