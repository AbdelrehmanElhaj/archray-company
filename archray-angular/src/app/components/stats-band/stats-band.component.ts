import { Component } from '@angular/core';

@Component({
  selector: 'app-stats-band',
  standalone: true,
  template: `
    <div class="band">
      <div class="inner">
        @for (stat of stats; track stat.label) {
          <div class="stat">
            <div class="value">{{ stat.value }}</div>
            <div class="label">{{ stat.label }}</div>
            @if (stat.sub) { <div class="sub">{{ stat.sub }}</div> }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .band {
      background: var(--navy-light);
      border-top: 1px solid rgba(212,175,55,0.12);
      border-bottom: 1px solid rgba(212,175,55,0.12);
    }
    .inner {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 40px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
    .stat {
      text-align: center;
      padding: 28px 16px;
    }
    .value {
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: clamp(32px, 4vw, 52px);
      color: var(--gold);
      line-height: 1;
    }
    .label {
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      font-size: 11px;
      letter-spacing: 2.5px;
      color: var(--white);
      margin-top: 8px;
      text-transform: uppercase;
    }
    .sub {
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      color: rgba(255,255,255,0.35);
      margin-top: 4px;
    }
    @media (max-width: 600px) {
      .inner { grid-template-columns: repeat(2, 1fr); }
    }
  `],
})
export class StatsBandComponent {
  readonly stats = [
    { value: '10+', label: 'Years Experience',    sub: 'Since 2015' },
    { value: '85+', label: 'Projects Completed',  sub: 'Residential & Commercial' },
    { value: '60+', label: 'Satisfied Clients',   sub: 'UAE & GCC' },
    { value: '5',   label: 'Cities',              sub: 'Abu Dhabi · Dubai · Riyadh · Doha · Cairo' },
  ];
}
