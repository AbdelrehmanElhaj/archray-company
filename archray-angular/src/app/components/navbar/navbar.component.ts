import { Component } from '@angular/core';
import { ArchrayIconComponent } from '../archray-icon/archray-icon.component';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ArchrayIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  menuOpen = false;

  readonly navItems = [
    { label: 'Home',     id: 'home' },
    { label: 'About',    id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Team',     id: 'team' },
    { label: 'Contact',  id: 'contact' },
  ];

  constructor(public scroll: ScrollService) {}

  scrollTo(id: string): void {
    this.scroll.scrollTo(id);
    this.menuOpen = false;
  }
}
