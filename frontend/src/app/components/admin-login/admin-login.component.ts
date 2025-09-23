import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>admin_panel_settings</mat-icon>
            Admin Login
          </mat-card-title>
          <mat-card-subtitle>Access the admin dashboard</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username" 
                     placeholder="Enter your username" 
                     autocomplete="username">
              <mat-icon matSuffix>person</mat-icon>
              <mat-error *ngIf="loginForm.get('username')?.hasError('required')">
                Username is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput formControlName="password" 
                     type="password" 
                     placeholder="Enter your password"
                     autocomplete="current-password">
              <mat-icon matSuffix>lock</mat-icon>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" 
                      [disabled]="loginForm.invalid || isLoading" class="full-width">
                <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
                <span *ngIf="!isLoading">Login</span>
              </button>
            </div>
          </form>

          <div class="back-to-home">
            <button mat-button routerLink="/">
              <mat-icon>arrow_back</mat-icon>
              Back to Home
            </button>
          </div>

          <!-- Dummy Credentials Display -->
          <div class="dummy-credentials">
            <mat-card class="credentials-card">
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>info</mat-icon>
                  Demo Credentials
                </mat-card-title>
                <mat-card-subtitle>Use these credentials to access the admin dashboard</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="credentials-info">
                  <div class="credential-item">
                    <mat-icon>person</mat-icon>
                    <span class="label">Username:</span>
                    <span class="value">admin</span>
                  </div>
                  <div class="credential-item">
                    <mat-icon>lock</mat-icon>
                    <span class="label">Password:</span>
                    <span class="value">admin123</span>
                  </div>
                </div>
                <div class="quick-login">
                  <button mat-raised-button color="accent" (click)="fillCredentials()" class="fill-btn">
                    <mat-icon>auto_fix_high</mat-icon>
                    Fill Credentials
                  </button>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 64px);
      padding: 16px;
    }
    
    .login-card {
      width: 100%;
      max-width: 400px;
    }
    
    .form-actions {
      margin-top: 24px;
    }
    
    .back-to-home {
      text-align: center;
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid #e0e0e0;
    }

    .dummy-credentials {
      margin-top: 24px;
    }

    .credentials-card {
      background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
      border: 2px solid #2196f3;
    }

    .credentials-info {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 20px;
    }

    .credential-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }

    .credential-item mat-icon {
      color: #2196f3;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .credential-item .label {
      font-weight: 500;
      color: #333;
      min-width: 80px;
    }

    .credential-item .value {
      font-family: 'Courier New', monospace;
      font-weight: 600;
      color: #1976d2;
      background: rgba(25, 118, 210, 0.1);
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid #1976d2;
    }

    .quick-login {
      text-align: center;
    }

    .fill-btn {
      background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
      color: white;
      font-weight: 600;
    }

    .fill-btn:hover {
      background: linear-gradient(135deg, #f57c00 0%, #ef6c00 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
    }
  `]
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open('Invalid credentials. Please try again.', 'Close', { duration: 5000 });
          console.error('Login error:', error);
        }
      });
    }
  }

  fillCredentials(): void {
    this.loginForm.patchValue({
      username: 'admin',
      password: 'admin123'
    });
    this.snackBar.open('Credentials filled! Click Login to continue.', 'Close', { duration: 3000 });
  }
}
