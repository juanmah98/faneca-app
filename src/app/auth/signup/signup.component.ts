import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
 standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
   form;
  loading = false;
  error: string|null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { this.form = this.fb.group({
    full_name: ['', Validators.required],
    display_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    phone: [''],
    location: ['', Validators.required],
    postal_code: ['']
  });}

  async signUpWithEmail() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;
    const { full_name, display_name, email, password, phone, location, postal_code } = this.form.value;
    try {
      // 1) Signup
      const { error: e1 } = await this.auth.signUp(email!, password!);
      if (e1) throw e1;
      // 2) Upsert profile como producer
      await this.auth.upsertProfile({
        full_name: full_name!,
        role: 'producer',
        avatar_url: ''
      });
      // 3) Aquí podrías también guardar en producers: farm_name = display_name, location y phone
      // …
    } catch(err: any) {
      this.error = err.message || 'Error al registrarse';
    } finally {
      this.loading = false;
    }
  }

  signUpWithGoogle() {
   const a = this.auth.signInWithGoogle();
   console.log(a);
    /* this.redirigir(); */
  }

  redirigir() {
    this.router.navigate(['/home']);
  }
  
}
