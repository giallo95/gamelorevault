import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {

  @HostListener('window:resize')
  onResize() {
    this.adjustContentMargin();
  }

  ngAfterViewInit() {
    this.adjustContentMargin();
  }

  private adjustContentMargin() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (navbar) {
      const navbarHeight = navbar.clientHeight;
      const content = document.querySelector('.content') as HTMLElement;
      if (content) {
        content.style.marginTop = `${navbarHeight}px`;
      }
    }
  }
}
