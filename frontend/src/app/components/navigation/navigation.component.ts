import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule
  ],
  template: `
    <!-- Desktop Sidebar Navigation -->
    <mat-sidenav-container class="sidebar-container">
      <mat-sidenav #sidenav mode="side" opened="true" class="sidebar">
        <!-- Sidebar Header -->
        <div class="sidebar-header">
          <div class="brand-section">
            <div class="logo-container">
              <mat-icon class="brand-icon">report_problem</mat-icon>
            </div>
            <span class="sidebar-title">College Complaint Box</span>
          </div>
        </div>

        <!-- Navigation Menu -->
        <mat-nav-list class="sidebar-nav">
          <a mat-list-item routerLink="/" routerLinkActive="active" class="nav-item">
            <mat-icon matListItemIcon>home</mat-icon>
            <span matListItemTitle>Home</span>
          </a>
          
          <a mat-list-item routerLink="/submit" routerLinkActive="active" class="nav-item">
            <mat-icon matListItemIcon>add_circle</mat-icon>
            <span matListItemTitle>Submit Complaint</span>
          </a>
          
          <a mat-list-item routerLink="/track" routerLinkActive="active" class="nav-item">
            <mat-icon matListItemIcon>track_changes</mat-icon>
            <span matListItemTitle>Track Complaint</span>
          </a>
          
          <a mat-list-item routerLink="/admin/login" routerLinkActive="active" class="nav-item">
            <mat-icon matListItemIcon>admin_panel_settings</mat-icon>
            <span matListItemTitle>Admin Login</span>
          </a>
        </mat-nav-list>

        <!-- Sidebar Footer -->
        <div class="sidebar-footer">
          <div class="footer-content">
            <p class="footer-text">© 2024 Complaint Box</p>
            <p class="footer-subtext">College Management System</p>
          </div>
        </div>
      </mat-sidenav>

      <!-- Main Content Area -->
      <mat-sidenav-content class="main-content">
        <!-- Mobile Header -->
        <div class="mobile-header">
          <button mat-icon-button (click)="toggleMobileMenu()" class="mobile-menu-btn">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="mobile-title">College Complaint Box</span>
        </div>
        
        <!-- Content will be inserted here by router-outlet -->
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>

    <!-- Mobile Side Navigation -->
    <mat-sidenav-container class="mobile-nav-container">
      <mat-sidenav #mobileSidenav mode="over" position="start" class="mobile-sidenav">
        <div class="mobile-nav-content">
          <div class="mobile-nav-header">
            <div class="mobile-brand">
              <mat-icon class="mobile-brand-icon">report_problem</mat-icon>
              <span class="mobile-nav-title">Complaint Box</span>
            </div>
            <button mat-icon-button (click)="mobileSidenav.close()" class="close-btn">
              <mat-icon>close</mat-icon>
            </button>
          </div>
          
          <mat-nav-list class="mobile-nav-list">
            <a mat-list-item routerLink="/" (click)="mobileSidenav.close()" class="mobile-nav-item">
              <mat-icon matListItemIcon>home</mat-icon>
              <span matListItemTitle>Home</span>
            </a>
            
            <a mat-list-item routerLink="/submit" (click)="mobileSidenav.close()" class="mobile-nav-item">
              <mat-icon matListItemIcon>add_circle</mat-icon>
              <span matListItemTitle>Submit Complaint</span>
            </a>
            
            <a mat-list-item routerLink="/track" (click)="mobileSidenav.close()" class="mobile-nav-item">
              <mat-icon matListItemIcon>track_changes</mat-icon>
              <span matListItemTitle>Track Complaint</span>
            </a>
            
            <a mat-list-item routerLink="/admin/login" (click)="mobileSidenav.close()" class="mobile-nav-item">
              <mat-icon matListItemIcon>admin_panel_settings</mat-icon>
              <span matListItemTitle>Admin Login</span>
            </a>
          </mat-nav-list>
        </div>
      </mat-sidenav>
    </mat-sidenav-container>
  `,
  styles: [`
    /* Sidebar Container */
    .sidebar-container {
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
    }
    
    /* Desktop Sidebar */
    .sidebar {
      width: 280px;
      background: linear-gradient(180deg, #1f2937 0%, #111827 100%);
      box-shadow: 4px 0 24px rgba(0, 0, 0, 0.25);
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      z-index: 1000;
    }
    
    
    /* Sidebar Header */
    .sidebar-header {
      padding: 24px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .brand-section {
      display: flex;
      align-items: center;
      gap: 16px;
      min-width: 0;
    }
    
    .logo-container {
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      flex-shrink: 0;
    }
    
    .brand-icon {
      color: white;
      font-size: 28px;
      width: 28px;
      height: 28px;
    }
    
    .sidebar-title {
      color: white;
      font-weight: 700;
      font-size: 18px;
      letter-spacing: -0.5px;
      font-family: 'Inter', sans-serif;
      white-space: nowrap;
      transition: opacity 0.3s ease;
    }
    
    .sidebar-title.hidden {
      opacity: 0;
      width: 0;
      overflow: hidden;
    }
    
    
    /* Sidebar Navigation */
    .sidebar-nav {
      padding: 16px 12px;
      flex: 1;
    }
    
    .nav-item {
      border-radius: 16px !important;
      margin: 8px 0 !important;
      padding: 16px 20px !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: transparent;
      color: rgba(255, 255, 255, 0.8) !important;
      position: relative;
      overflow: hidden;
    }
    
    .nav-item:hover {
      background: rgba(255, 255, 255, 0.1) !important;
      transform: translateX(4px);
      color: white !important;
    }
    
    .nav-item.active {
      background: rgba(255, 255, 255, 0.2) !important;
      color: white !important;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
    
    .nav-item.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: white;
      border-radius: 0 4px 4px 0;
    }
    
    .nav-item mat-icon {
      color: inherit;
      font-size: 22px;
      width: 22px;
      height: 22px;
      margin-right: 16px;
    }
    
    .nav-item span {
      color: inherit;
      font-weight: 500;
      font-size: 15px;
      transition: opacity 0.3s ease;
    }
    
    .nav-item span.hidden {
      opacity: 0;
      width: 0;
      overflow: hidden;
    }
    
    /* Sidebar Footer */
    .sidebar-footer {
      padding: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      margin-top: auto;
    }
    
    .footer-content {
      text-align: center;
      transition: opacity 0.3s ease;
    }
    
    .footer-content.hidden {
      opacity: 0;
      height: 0;
      overflow: hidden;
    }
    
    .footer-text {
      color: rgba(255, 255, 255, 0.8);
      font-size: 12px;
      margin: 0 0 4px 0;
      font-weight: 500;
    }
    
    .footer-subtext {
      color: rgba(255, 255, 255, 0.6);
      font-size: 10px;
      margin: 0;
    }
    
    /* Main Content Area */
    .main-content {
      background: linear-gradient(135deg, #111827 0%, #1f2937 100%) !important;
      min-height: 100vh;
      margin-left: 280px;
      transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      z-index: 1;
      width: calc(100% - 280px);
    }
    
    
    /* Mobile Header */
    .mobile-header {
      display: none;
      background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
      padding: 16px 20px;
      align-items: center;
      gap: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1001;
    }
    
    .mobile-menu-btn {
      color: white !important;
      background: rgba(255, 255, 255, 0.1) !important;
      border-radius: 12px !important;
      width: 44px !important;
      height: 44px !important;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    
    .mobile-menu-btn:hover {
      background: rgba(255, 255, 255, 0.2) !important;
    }
    
    .mobile-title {
      color: white;
      font-weight: 700;
      font-size: 18px;
      font-family: 'Inter', sans-serif;
    }
    
    /* Mobile Navigation */
    .mobile-nav-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      pointer-events: none;
    }
    
    .mobile-nav-container mat-sidenav {
      pointer-events: auto;
    }
    
    .mobile-sidenav {
      width: 320px;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      box-shadow: 4px 0 32px rgba(0, 0, 0, 0.15);
      border-right: 1px solid rgba(0, 0, 0, 0.05);
    }
    
    .mobile-nav-content {
      padding: 32px 24px;
      height: 100%;
    }
    
    .mobile-nav-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 2px solid #e2e8f0;
    }
    
    .mobile-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .mobile-brand-icon {
      color: #ffffff;
      font-size: 28px;
      width: 28px;
      height: 28px;
    }
    
    .mobile-nav-title {
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
      font-family: 'Inter', sans-serif;
    }
    
    .close-btn {
      color: #64748b !important;
      background: rgba(100, 116, 139, 0.1) !important;
      border-radius: 12px !important;
    }
    
    .close-btn:hover {
      background: rgba(100, 116, 139, 0.2) !important;
    }
    
    .mobile-nav-list {
      padding: 0;
    }
    
    .mobile-nav-item {
      border-radius: 16px !important;
      margin: 8px 0 !important;
      padding: 16px 20px !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    
    .mobile-nav-item:hover {
      background: #f8fafc !important;
      transform: translateX(4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }
    
    .mobile-nav-item mat-icon {
      color: #ffffff;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
    
    .mobile-nav-item span {
      color: #1e293b;
      font-weight: 500;
      font-size: 16px;
    }
    
    /* Responsive Design */
    @media (max-width: 1024px) {
      .sidebar {
        width: 240px;
      }
      
      .main-content {
        margin-left: 240px;
        width: calc(100% - 240px);
      }
      
      .sidebar-title {
        font-size: 16px;
      }
      
      .nav-item {
        padding: 14px 16px !important;
      }
      
      .nav-item mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
        margin-right: 12px;
      }
    }
    
    @media (max-width: 768px) {
      .sidebar-container {
        display: none;
      }
      
      .main-content {
        margin-left: 0;
        width: 100%;
        padding-top: 80px;
      }
      
      .mobile-header {
        display: flex;
      }
      
      .mobile-nav-container {
        pointer-events: auto;
      }
    }
    
    @media (max-width: 480px) {
      .mobile-header {
        padding: 12px 16px;
      }
      
      .mobile-title {
        font-size: 16px;
      }
      
      .mobile-sidenav {
        width: 280px;
      }
    }
  `]
})
export class NavigationComponent implements OnInit {
  currentTheme: any = { isDark: false };

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void {
    // This will be handled by the mat-sidenav reference
  }
}
