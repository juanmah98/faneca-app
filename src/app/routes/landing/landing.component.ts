import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss'
})
export class LandingComponent {
 constructor(
    private router: Router, 
  ) { }
redirigir() {
    this.router.navigate(['/landing-producer']);
  }
}
