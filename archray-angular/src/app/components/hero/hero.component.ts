import { Component } from '@angular/core';
import { ArchrayIconComponent } from '../archray-icon/archray-icon.component';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ArchrayIconComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  constructor(private scroll: ScrollService) {}

  scrollTo(id: string): void {
    this.scroll.scrollTo(id);
  }
}
