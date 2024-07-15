import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  credentials = {
    username: '',
    password: '',
  };
  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        // Gestisci il successo del login se necessario
      },
      error: (err) => {
        console.error('Login error:', err);
      },
    });
  }
}
