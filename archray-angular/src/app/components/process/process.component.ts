import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <div class="band">
      <div class="inner">
        <div appReveal class="header">
          <div class="gold-label">
            <div class="gold-label-line"></div>
            <span class="gold-label-text">Our Process</span>
          </div>
          <h3 class="title">How We Work</h3>
        </div>
        <div appReveal class="steps">
          @for (step of steps; track step.num) {
            <div class="step">
              <div class="num">{{ step.num }}</div>
              <div class="step-title">{{ step.title }}</div>
              <div class="step-desc">{{ step.desc }}</div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .band {
      background: var(--navy-light);
      border-top: 1px solid rgba(212,175,55,0.1);
      border-bottom: 1px solid rgba(212,175,55,0.1);
      padding: 56px 40px;
    }
    .inner { max-width: 1100px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 40px; }
    .title {
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: clamp(20px, 2.5vw, 30px);
      color: var(--white);
    }
    .steps {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
    }
    .step { text-align: center; padding: 16px 12px; }
    .num {
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: 36px;
      color: rgba(212,175,55,0.18);
      line-height: 1;
      margin-bottom: 10px;
    }
    .step-title {
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      font-size: 12px;
      color: var(--white);
      margin-bottom: 8px;
    }
    .step-desc {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      color: rgba(255,255,255,0.38);
      line-height: 1.7;
    }
    @media (max-width: 700px) {
      .steps { grid-template-columns: repeat(2, 1fr); }
    }
  `],
})
export class ProcessComponent {
  readonly steps = [
    { num: '01', title: 'Discovery',     desc: 'We listen deeply — understanding your vision, constraints, brief, and aspirations.' },
    { num: '02', title: 'Concept',       desc: 'Bold conceptual ideas, tested against the site, program, and client values.' },
    { num: '03', title: 'Design',        desc: 'Detailed design development — architecture, interiors, and engineering integrated.' },
    { num: '04', title: 'Documentation', desc: 'Complete construction documentation and authority approvals managed end-to-end.' },
    { num: '05', title: 'Delivery',      desc: 'Site supervision, quality control, and handover — we stay until it\'s perfect.' },
  ];
}
