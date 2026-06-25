import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-archray-icon',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size * 1.02"
         viewBox="0 0 100 102" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="50" y1="6" x2="10" y2="96"
        [attr.stroke]="strokeColor" [attr.stroke-width]="sw" stroke-linecap="round"/>
      <line x1="50" y1="6" x2="90" y2="96"
        [attr.stroke]="strokeColor" [attr.stroke-width]="sw" stroke-linecap="round"/>
      <line x1="82" y1="8" x2="28" y2="88"
        stroke="#D4AF37" [attr.stroke-width]="sw * 0.85" stroke-linecap="round"
        class="anim-ray-pulse"/>
    </svg>
  `,
  styles: [`:host { display: inline-block; line-height: 0; }`],
})
export class ArchrayIconComponent {
  @Input() size = 72;
  @Input() onDark = true;

  get strokeColor(): string {
    return this.onDark ? '#FFFFFF' : '#0F2744';
  }

  get sw(): number {
    return this.size * 0.055;
  }
}
