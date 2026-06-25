import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  readonly projects = [
    { title: 'Saadiyat Villa Compound',   type: 'RESIDENTIAL', location: 'Abu Dhabi, UAE', year: '2025', accent: '#1a3a5c' },
    { title: 'Al Reem Island Tower',      type: 'COMMERCIAL',  location: 'Abu Dhabi, UAE', year: '2024', accent: '#1e2e44' },
    { title: 'Desert Rose Residence',     type: 'RESIDENTIAL', location: 'Dubai, UAE',     year: '2024', accent: '#2a2010' },
    { title: 'Diplomatic Quarter Office', type: 'COMMERCIAL',  location: 'Riyadh, KSA',   year: '2023', accent: '#0a2a3a' },
    { title: 'Lusail Waterfront Plaza',   type: 'URBAN',       location: 'Doha, Qatar',   year: '2023', accent: '#10283a' },
    { title: 'Cairo Business District',   type: 'MASTERPLAN',  location: 'Cairo, Egypt',  year: '2022', accent: '#1a2818' },
  ];
}
