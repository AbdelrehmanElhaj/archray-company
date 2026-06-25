import { Component } from '@angular/core';
import { ArchrayIconComponent } from '../archray-icon/archray-icon.component';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ArchrayIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly serviceLinks = ['Architecture', 'Interior Design', 'Engineering', 'Urban Planning', 'Project Management', 'Sustainability'];
  readonly companyLinks = ['About Us', 'Our Projects', 'Our Team', 'Careers', 'News', 'Contact'];
  readonly contactInfo = [
    { icon: '✆', text: '+971 50 123 4567' },
    { icon: '✉', text: 'albashir@archray.ae' },
    { icon: '⊕', text: 'www.archray.ae' },
    { icon: '⌖', text: 'Abu Dhabi, UAE' },
  ];

  constructor(private scroll: ScrollService) {}

  scrollTo(id: string): void {
    this.scroll.scrollTo(id);
  }
}
