import { Routes } from '@angular/router';
import { LandingComponent } from './routes/landing/landing.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { LandingProducerComponent } from './routes/landing-producer/landing-producer.component';
import { HomeComponent } from './routes/home/home.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }, 
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'landing-producer', component: LandingProducerComponent },
];
