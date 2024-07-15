import { AfterViewInit, Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements AfterViewInit {
  isLoggedIn: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustContentMargin();
  }

  ngAfterViewInit() {
    this.adjustContentMargin();
  }

  private adjustContentMargin() {
    /* if (!document){return}
    const navbar = document.querySelector('.navbar') as HTMLElement;

    if (navbar) {
      const navbarHeight = navbar.clientHeight;
      const content = document.querySelector('.content') as HTMLElement;
      if (content) {
        content.style.marginTop = `${navbarHeight}px`;
      }
    }*/
    if (typeof this.document !== 'undefined') {
      const navbarHeight =
        this.document.querySelector('.navbar')?.clientHeight || 0;
      const content = this.document.querySelector('.content') as HTMLElement;
      if (content) {
        content.style.marginTop = `${navbarHeight}px`;
      }
    }
  }
}
