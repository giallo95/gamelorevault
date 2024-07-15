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
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('Login successful', response);
        // Puoi salvare il token nel localStorage o in un altro luogo sicuro
        localStorage.setItem('token', response);
      },
      (error) => {
        console.error('Error logging in', error);
      }
    );
  }
}
