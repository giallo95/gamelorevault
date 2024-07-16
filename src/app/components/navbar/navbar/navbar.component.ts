import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  Renderer2,
} from '@angular/core';
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
    private authService: AuthService,
    private renderer: Renderer2
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
    this.setupNavbarToggle();
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

  private setupNavbarToggle() {
    const toggler = this.document.getElementById('navbarToggler');
    const navbarCollapse = this.document.getElementById('navbarCollapse');

    console.log('Toggler:', toggler);
    console.log('Navbar Collapse:', navbarCollapse);

    if (toggler && navbarCollapse) {
      this.renderer.listen(toggler, 'click', () => {
        console.log('Toggler clicked');
        if (navbarCollapse.classList.contains('show')) {
          this.renderer.removeClass(navbarCollapse, 'show');
        } else {
          this.renderer.addClass(navbarCollapse, 'show');
        }
      });

      this.renderer.listen('window', 'click', (event: Event) => {
        if (
          !navbarCollapse.contains(event.target as Node) &&
          !toggler.contains(event.target as Node)
        ) {
          this.renderer.removeClass(navbarCollapse, 'show');
        }
      });
    }
  }
}
