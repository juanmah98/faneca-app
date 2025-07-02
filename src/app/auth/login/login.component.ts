import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
 standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form;
  loading = false;
  error: string|null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { this.form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });;}

  async onSubmit() {
    console.log("estamos")
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;
    console.log("estamos dentro")
    const { email, password } = this.form.value;
    try {
      const { error } = await this.auth.signIn(email!, password!);
      if (error) throw error;
      await this.router.navigate(['/']);
    } catch (err: any) {
      this.error = err.message || 'Error al iniciar sesión';
    } finally {
      this.loading = false;
    }
  }

  async loginWithGoogle() {
    await this.auth.signInWithGoogle();
  }
}
