import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-container">
          <div class="hero-content">
            <div class="hero-badge">
              <mat-icon>verified</mat-icon>
              <span>Trusted Platform</span>
            </div>
            
            <h1 class="hero-title">
              <span class="gradient-text">College Complaint Management System</span>
            </h1>
            
            <p class="hero-description">
              Streamline complaint resolution with our comprehensive platform. 
              Submit, track, and manage complaints efficiently with real-time updates and transparent communication.
            </p>
            
            
            <div class="hero-actions">
              <button mat-raised-button class="primary-btn" routerLink="/submit">
                <mat-icon>add_circle</mat-icon>
                <span>Submit Complaint</span>
              </button>
              <button mat-stroked-button class="secondary-btn" routerLink="/track">
                <mat-icon>track_changes</mat-icon>
                <span>Track Status</span>
              </button>
            </div>
          </div>
          
          <div class="hero-visual">
            <div class="dashboard-preview">
              <div class="preview-header">
                <div class="preview-dots">
                  <span></span><span></span><span></span>
                </div>
                <span class="preview-title">Complaint Dashboard</span>
              </div>
              <div class="preview-content">
                <div class="preview-card">
                  <mat-icon>assignment_turned_in</mat-icon>
                  <span>Resolved</span>
                  <div class="preview-number">24</div>
                </div>
                <div class="preview-card">
                  <mat-icon>schedule</mat-icon>
                  <span>In Progress</span>
                  <div class="preview-number">8</div>
                </div>
                <div class="preview-card">
                  <mat-icon>new_releases</mat-icon>
                  <span>New</span>
                  <div class="preview-number">3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Actions Section -->
      <section class="actions-section">
        <div class="section-header">
          <h2>Quick Actions</h2>
          <p>Choose what you'd like to do today</p>
        </div>
        
        <div class="action-grid">
          <div class="action-card submit-card" routerLink="/submit">
            <div class="card-header">
              <div class="card-icon">
                <mat-icon>add_circle</mat-icon>
              </div>
              <div class="card-badge">Primary</div>
            </div>
            <div class="card-body">
              <h3>Submit Complaint</h3>
              <p>Report issues, concerns, or feedback to the college administration with detailed information and supporting documents.</p>
            </div>
            <div class="card-footer">
              <button class="action-btn">
                <span>Submit Now</span>
                <mat-icon>arrow_forward</mat-icon>
              </button>
            </div>
          </div>

          <div class="action-card track-card" routerLink="/track">
            <div class="card-header">
              <div class="card-icon">
                <mat-icon>track_changes</mat-icon>
              </div>
              <div class="card-badge">Track</div>
            </div>
            <div class="card-body">
              <h3>Track Complaint</h3>
              <p>Monitor the progress of your submitted complaints in real-time with status updates and notifications.</p>
            </div>
            <div class="card-footer">
              <button class="action-btn">
                <span>Track Now</span>
                <mat-icon>arrow_forward</mat-icon>
              </button>
            </div>
          </div>

          <div class="action-card admin-card" routerLink="/admin/login">
            <div class="card-header">
              <div class="card-icon">
                <mat-icon>admin_panel_settings</mat-icon>
              </div>
              <div class="card-badge">Admin</div>
            </div>
            <div class="card-body">
              <h3>Admin Portal</h3>
              <p>Administrative access to manage complaints, respond to queries, and oversee the entire platform.</p>
            </div>
            <div class="card-footer">
              <button class="action-btn">
                <span>Admin Access</span>
                <mat-icon>arrow_forward</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="how-it-works">
        <div class="section-header">
          <h2>How It Works</h2>
          <p>Simple steps to get your concerns addressed</p>
        </div>
        
        <div class="steps-container">
          <div class="step-item">
            <div class="step-number">01</div>
            <div class="step-content">
              <div class="step-icon">
                <mat-icon>edit_note</mat-icon>
              </div>
              <h3>Submit Your Concern</h3>
              <p>Fill out our comprehensive complaint form with all necessary details, including category, description, and any supporting documents.</p>
            </div>
            <div class="step-arrow">
              <mat-icon>arrow_forward</mat-icon>
            </div>
          </div>

          <div class="step-item">
            <div class="step-number">02</div>
            <div class="step-content">
              <div class="step-icon">
                <mat-icon>assignment_turned_in</mat-icon>
              </div>
              <h3>Administration Review</h3>
              <p>Our dedicated team reviews your complaint, categorizes it appropriately, and assigns it to the relevant department for resolution.</p>
            </div>
            <div class="step-arrow">
              <mat-icon>arrow_forward</mat-icon>
            </div>
          </div>

          <div class="step-item">
            <div class="step-number">03</div>
            <div class="step-content">
              <div class="step-icon">
                <mat-icon>check_circle</mat-icon>
              </div>
              <h3>Track & Resolve</h3>
              <p>Monitor the progress of your complaint in real-time and receive updates as it moves through the resolution process.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
    }

    /* Hero Section */
    .hero-section {
      position: relative;
      padding: 120px 24px;
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: white;
      overflow: hidden;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero-container {
      max-width: 1400px;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      opacity: 0.3;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      text-align: left;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.15);
      padding: 8px 16px;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 24px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .hero-title {
      font-size: clamp(2.5rem, 5vw, 3.5rem);
      font-weight: 800;
      margin-bottom: 24px;
      line-height: 1.1;
    }

    .gradient-text {
      background: linear-gradient(135deg, #ffffff 0%, #f3e8ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-size: clamp(1.2rem, 3vw, 1.8rem);
      font-weight: 400;
      opacity: 0.9;
    }

    .hero-description {
      font-size: 1.2rem;
      line-height: 1.6;
      opacity: 0.9;
      margin-bottom: 40px;
      max-width: 500px;
    }

    .hero-stats {
      display: flex;
      gap: 48px;
      margin-bottom: 48px;
      flex-wrap: wrap;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 8px;
      background: linear-gradient(135deg, #ffffff 0%, #f3e8ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-label {
      font-size: 14px;
      opacity: 0.8;
      font-weight: 500;
    }

    .hero-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .primary-btn {
      background: white !important;
      color: #8b5cf6 !important;
      font-weight: 600 !important;
      padding: 16px 32px !important;
      border-radius: 12px !important;
      font-size: 16px !important;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    .primary-btn:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3) !important;
    }

    .secondary-btn {
      border: 2px solid rgba(255, 255, 255, 0.3) !important;
      color: white !important;
      font-weight: 600 !important;
      padding: 14px 30px !important;
      border-radius: 12px !important;
      font-size: 16px !important;
      background: rgba(255, 255, 255, 0.1) !important;
      backdrop-filter: blur(10px) !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    .secondary-btn:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      transform: translateY(-2px) !important;
    }

    .hero-visual {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dashboard-preview {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 24px;
      padding: 24px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .preview-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .preview-dots {
      display: flex;
      gap: 6px;
    }

    .preview-dots span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
    }

    .preview-dots span:first-child {
      background: #ef4444;
    }

    .preview-dots span:nth-child(2) {
      background: #f59e0b;
    }

    .preview-dots span:last-child {
      background: #10b981;
    }

    .preview-title {
      font-size: 16px;
      font-weight: 600;
      color: white;
    }

    .preview-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .preview-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      transition: all 0.3s ease;
    }

    .preview-card:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }

    .preview-card mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      color: white;
    }

    .preview-card span {
      flex: 1;
      color: white;
      font-weight: 500;
    }

    .preview-number {
      font-size: 24px;
      font-weight: 700;
      color: white;
      background: rgba(255, 255, 255, 0.1);
      padding: 8px 16px;
      border-radius: 12px;
      min-width: 60px;
      text-align: center;
    }

    /* Section Headers */
    .section-header {
      text-align: center;
      margin-bottom: 64px;
    }

    .section-header h2 {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      margin-bottom: 16px;
      color: #ffffff;
    }

    .section-header p {
      font-size: 1.2rem;
      color: #a78bfa;
      max-width: 600px;
      margin: 0 auto;
    }

    /* Actions Section */
    .actions-section {
      padding: 80px 24px;
      background: #1e1b4b;
    }

    .action-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 32px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .action-card {
      background: #312e81;
      border-radius: 24px;
      padding: 0;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      border: 1px solid #4c1d95;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .action-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    .action-card:hover::before {
      transform: scaleX(1);
    }

    .action-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 48px rgba(139, 92, 246, 0.2);
      border-color: #8b5cf6;
    }

    .card-header {
      padding: 24px 24px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-icon {
      width: 56px;
      height: 56px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .submit-card .card-icon {
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: white;
    }

    .track-card .card-icon {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }

    .admin-card .card-icon {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
    }

    .card-icon mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .card-badge {
      background: rgba(255, 255, 255, 0.1);
      color: #a78bfa;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .card-body {
      padding: 0 24px 24px;
      flex: 1;
    }

    .card-body h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 12px;
      color: #ffffff;
    }

    .card-body p {
      color: #a78bfa;
      line-height: 1.6;
      margin-bottom: 0;
    }

    .card-footer {
      padding: 0 24px 24px;
    }

    .action-btn {
      width: 100%;
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: white;
      border: none;
      border-radius: 12px;
      padding: 12px 20px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .action-btn:hover {
      background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);
    }

    .action-btn mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    /* How It Works Section */
    .how-it-works {
      padding: 80px 24px;
      background: #312e81;
    }

    .steps-container {
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .step-item {
      display: flex;
      align-items: center;
      gap: 32px;
      background: #1e1b4b;
      padding: 32px;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      border: 1px solid #4c1d95;
      transition: all 0.3s ease;
    }

    .step-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 48px rgba(139, 92, 246, 0.2);
      border-color: #8b5cf6;
    }

    .step-number {
      font-size: 3rem;
      font-weight: 800;
      color: #8b5cf6;
      flex-shrink: 0;
      width: 80px;
      text-align: center;
    }

    .step-content {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .step-icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .step-icon mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .step-content h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 8px;
      color: #ffffff;
    }

    .step-content p {
      color: #a78bfa;
      line-height: 1.6;
      margin: 0;
    }

    .step-arrow {
      color: #a78bfa;
      font-size: 24px;
      flex-shrink: 0;
    }


    /* Responsive Design */
    @media (max-width: 1024px) {
      .hero-container {
        grid-template-columns: 1fr;
        gap: 60px;
        text-align: center;
      }
      
      .hero-content {
        text-align: center;
      }
      
      .hero-stats {
        justify-content: center;
        gap: 32px;
      }
      
      .hero-actions {
        justify-content: center;
      }
      
      .action-grid {
        grid-template-columns: 1fr;
      }
      
      .step-item {
        flex-direction: column;
        text-align: center;
        gap: 24px;
      }
      
      .step-content {
        flex-direction: column;
        text-align: center;
      }
      
      .step-arrow {
        transform: rotate(90deg);
      }
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 80px 16px;
      }
      
      .hero-container {
        gap: 40px;
      }
      
      .actions-section,
      .how-it-works {
        padding: 60px 16px;
      }
      
      .hero-stats {
        flex-direction: column;
        gap: 24px;
      }
      
      .hero-actions {
        flex-direction: column;
        align-items: center;
      }
      
      .action-card {
        flex-direction: column;
        text-align: center;
        gap: 20px;
      }
      
      .dashboard-preview {
        max-width: 100%;
      }
    }

    @media (max-width: 480px) {
      .hero-section {
        padding: 40px 12px;
      }
      
      .actions-section,
      .how-it-works {
        padding: 40px 12px;
      }
      
      .action-card {
        padding: 24px;
      }
      
      .step-item {
        padding: 24px;
      }
    }
  `]
})
export class HomeComponent {}

