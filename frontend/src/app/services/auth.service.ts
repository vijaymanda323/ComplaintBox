import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  admin: {
    id: string;
    username: string;
  };
}

export interface Admin {
  id: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = this.getApiUrl();
  private currentAdminSubject = new BehaviorSubject<Admin | null>(null);
  public currentAdmin$ = this.currentAdminSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkStoredToken();
  }

  private getApiUrl(): string {
    // Check if we're in production (Vercel)
    if (window.location.hostname.includes('vercel.app') || window.location.hostname.includes('vercel.com')) {
      return '/api';
    }
    // Development
    return 'http://localhost:3000/api';
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/admin/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('adminToken', response.token);
          this.currentAdminSubject.next(response.admin);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('adminToken');
    this.currentAdminSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('adminToken');
  }

  getToken(): string | null {
    return localStorage.getItem('adminToken');
  }

  verifyToken(): Observable<{ message: string; admin: Admin }> {
    return this.http.get<{ message: string; admin: Admin }>(`${this.apiUrl}/admin/verify`)
      .pipe(
        tap(response => {
          this.currentAdminSubject.next(response.admin);
        })
      );
  }

  private checkStoredToken(): void {
    const token = this.getToken();
    if (token) {
      this.verifyToken().subscribe({
        error: () => {
          this.logout();
        }
      });
    }
  }
}
















