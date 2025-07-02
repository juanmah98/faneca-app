// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../../environments/enviornments';


export interface Profile {
  id: string;
  full_name: string;
  role: string;
  avatar_url?: string;
}

export type ProfileUpsert = Omit<Profile, 'id'> & { id?: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  // — Auth —
  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }
  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }
  signInWithGoogle() {
    return this.supabase.auth.signInWithOAuth({ provider: 'google' });
  }
  signOut() {
    return this.supabase.auth.signOut();
  }

  logeadoGoogle(){
    this.supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      console.log('Usuario logueado:', session.user)
    } else {
      console.log('No hay sesión activa')
    }
  })
  }

  // — Usuario —
  private async getCurrentUser(): Promise<User> {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser();
    if (error || !user) throw error || new Error('No autenticado');
    return user;
  }

  // — Perfil —
  async upsertProfile(profile: ProfileUpsert): Promise<void> {
    const user = await this.getCurrentUser();
    const { error } = await this.supabase
      .from('profiles')         // sin genéricos aquí
      .upsert([{ id: user.id, ...profile }]);
    if (error) throw error;
  }

 async getMyProfile(): Promise<Profile> {
  const user = await this.getCurrentUser();
  const { data, error } = await this.supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error || !data) throw error || new Error('Perfil no encontrado');
  return data as Profile;  // ← casteas aquí
}

}
