import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  readonly values = [
    { icon: '◈', title: 'Creative Vision',   desc: 'We push beyond convention — every design begins with a bold idea grounded in purpose.' },
    { icon: '◎', title: 'Precision Craft',    desc: 'Our technical rigor ensures every drawing, detail, and specification is executed flawlessly.' },
    { icon: '◉', title: 'Sustainability',      desc: 'Environmental responsibility is embedded at every stage of our design and construction process.' },
    { icon: '◇', title: 'Partnership',         desc: 'We build long-term relationships, treating every client\'s project as our own life\'s work.' },
  ];

  readonly tags = ['Design Excellence', 'Sustainable Practice', 'Technical Precision', 'Client-Centered'];
}
