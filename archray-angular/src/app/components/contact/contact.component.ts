import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RevealDirective, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  readonly contactInfo = [
    { icon: '✉', label: 'EMAIL',   value: 'albashir@archray.ae' },
    { icon: '✆', label: 'PHONE',   value: '+971 50 123 4567' },
    { icon: '⊕', label: 'WEBSITE', value: 'www.archray.ae' },
    { icon: '⌖', label: 'ADDRESS', value: 'Abu Dhabi, United Arab Emirates' },
  ];

  form = {
    name: '',
    email: '',
    service: '',
    message: '',
  };

  onSubmit(): void {
    // Form submission logic
  }
}
