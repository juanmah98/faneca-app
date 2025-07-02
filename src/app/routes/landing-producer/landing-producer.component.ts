import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-landing-producer',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-producer.component.html',
  styleUrl: './landing-producer.component.scss'
})
export class LandingProducerComponent {

   constructor(
    private router: Router, 
    private auth: AuthService
  ) { }

 ngOnInit() {
  // Esto guarda automáticamente el token y refresca la sesión
  const user = this.auth.logeadoGoogle()
  console.log("user: " + user)
}
redirigir() {
    this.router.navigate(['/signup']);
  }
}
