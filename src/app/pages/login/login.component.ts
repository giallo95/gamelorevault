import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('/api/users/login', this.user).subscribe((response: any) => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/profile']);
    });
  }
}
