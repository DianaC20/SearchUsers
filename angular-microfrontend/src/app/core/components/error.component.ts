import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../services/error.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="errorMessage$ | async as errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  `,
  styles: [
    `
      .error-message {
        color: red;
        background-color: #ffe6e6;
        padding: 10px;
        border: 1px solid red;
        border-radius: 5px;
        margin: 10px 0;
      }
    `,
  ],
})
export class ErrorComponent {
  errorMessage$: any; // Declara la propiedad sin inicializarla

  constructor(private errorService: ErrorService) {
    this.errorMessage$ = this.errorService.errorMessage$; // Inicializa en el constructor
  }
}