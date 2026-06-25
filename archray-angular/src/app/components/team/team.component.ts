import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent {
  readonly members = [
    { name: 'Albashir Elamin',   nameAr: 'البشير الأمين',    role: 'Architectural Engineer', roleAr: 'مهندس معماري',        initials: 'AE' },
    { name: 'Sara Al Mazrouei',  nameAr: 'سارة المزروعي',    role: 'Senior Designer',        roleAr: 'مصممة معمارية أولى',  initials: 'SM' },
    { name: 'Khalid Al Rashidi', nameAr: 'خالد الراشدي',     role: 'Structural Engineer',    roleAr: 'مهندس إنشائي',        initials: 'KR' },
    { name: 'Noor Bint Hamdan',  nameAr: 'نور بنت حمدان',    role: 'Interior Designer',      roleAr: 'مصممة داخلية',        initials: 'NH' },
  ];

  constructor(private scroll: ScrollService) {}

  scrollToContact(): void {
    this.scroll.scrollTo('contact');
  }
}
