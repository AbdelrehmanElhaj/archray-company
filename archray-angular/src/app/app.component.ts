import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { StatsBandComponent } from './components/stats-band/stats-band.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProcessComponent } from './components/process/process.component';
import { TeamComponent } from './components/team/team.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollService } from './services/scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    StatsBandComponent,
    AboutComponent,
    ServicesComponent,
    ProjectsComponent,
    ProcessComponent,
    TeamComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar></app-navbar>
    <app-hero></app-hero>
    <app-stats-band></app-stats-band>
    <app-about></app-about>
    <app-services></app-services>
    <app-projects></app-projects>
    <app-process></app-process>
    <app-team></app-team>
    <app-contact></app-contact>
    <app-footer></app-footer>
  `,
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;
  private readonly sectionIds = ['home', 'about', 'services', 'projects', 'team', 'contact'];

  constructor(private scroll: ScrollService) {}

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) this.scroll.activeSection.set(e.target.id);
        });
      },
      { threshold: 0.25 }
    );
    this.sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
