import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  activeSection = signal('home');

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
