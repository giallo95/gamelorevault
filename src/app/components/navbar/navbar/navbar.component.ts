import { AfterViewInit, Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {

  constructor(@Inject(DOCUMENT) private document: Document) {}

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
        const navbarHeight = this.document.querySelector('.navbar')?.clientHeight || 0;
        const content = this.document.querySelector('.content')as HTMLElement;
        if (content) {
          content.style.marginTop = `${navbarHeight}px`;
        }
  }
}}
