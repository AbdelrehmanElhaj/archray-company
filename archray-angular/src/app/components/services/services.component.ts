import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  readonly services = [
    { icon: '▲', title: 'Architecture & Design',   desc: 'From residential villas to commercial towers — we craft buildings that balance aesthetic ambition with constructability, local context, and long-term performance.' },
    { icon: '◈', title: 'Interior Design',          desc: 'We design interiors that feel inevitable — spaces where materials, light, and proportion work in harmony to create environments that enrich everyday life.' },
    { icon: '◎', title: 'Engineering Consultancy',  desc: 'Structural, MEP, and civil engineering delivered with precision. Our integrated consultancy model reduces coordination risk and accelerates project timelines.' },
    { icon: '⊞', title: 'Urban Planning',            desc: 'We contribute to the fabric of cities — masterplans, mixed-use developments, and public realm strategies that foster community and sustainable growth.' },
    { icon: '◉', title: 'Project Management',        desc: 'We oversee the entire lifecycle from feasibility to handover, ensuring projects are delivered on time, within budget, and to the highest quality standards.' },
    { icon: '◇', title: 'Sustainable Design',        desc: 'LEED and BREEAM-informed practice. We integrate passive design strategies, renewable energy systems, and material efficiency into every project.' },
  ];
}
