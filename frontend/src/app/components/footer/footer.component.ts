import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <footer class="modern-footer">
      <div class="footer-container">
        <div class="footer-content">
          <!-- Brand Section -->
          <div class="footer-section">
            <div class="footer-brand">
              <mat-icon class="footer-icon">report_problem</mat-icon>
              <span class="footer-title">College Complaint Box</span>
            </div>
            <p class="footer-description">
              Empowering students and faculty to voice their concerns and ensuring 
              transparent resolution of issues within our college community.
            </p>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h3 class="footer-section-title">Quick Links</h3>
            <ul class="footer-links">
              <li>
                <a href="/submit" class="footer-link">Submit Complaint</a>
              </li>
              <li>
                <a href="/track" class="footer-link">Track Complaint</a>
              </li>
              <li>
                <a href="/admin/login" class="footer-link">Admin Portal</a>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="footer-section">
            <h3 class="footer-section-title">Contact</h3>
            <div class="contact-info">
              <div class="contact-item">
                <mat-icon class="contact-icon">email</mat-icon>
                <span>complaints&#64;college.edu</span>
              </div>
              <div class="contact-item">
                <mat-icon class="contact-icon">phone</mat-icon>
                <span>+1 (555) 123-4567</span>
              </div>
              <div class="contact-item">
                <mat-icon class="contact-icon">location_on</mat-icon>
                <span>College Campus, City</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <div class="footer-copyright">
              © {{ currentYear }} College Complaint Box. All rights reserved.
            </div>
            <div class="footer-links-bottom">
              <a href="#" class="footer-link-bottom">Privacy Policy</a>
              <a href="#" class="footer-link-bottom">Terms of Service</a>
              <a href="#" class="footer-link-bottom">Help Center</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .modern-footer {
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      border-top: 1px solid #e2e8f0;
      margin-top: auto;
    }
    
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px 24px;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
      margin-bottom: 32px;
    }
    
    .footer-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .footer-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .footer-icon {
      color: #1e3a8a;
      font-size: 24px;
    }
    
    .footer-title {
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
    }
    
    .footer-description {
      color: #64748b;
      font-size: 14px;
      line-height: 1.6;
    }
    
    .footer-section-title {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 8px;
    }
    
    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .footer-link {
      color: #64748b;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s ease;
    }
    
    .footer-link:hover {
      color: #1e3a8a;
    }
    
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #64748b;
    }
    
    .contact-icon {
      color: #1e3a8a;
      font-size: 18px;
    }
    
    .footer-bottom {
      border-top: 1px solid #e2e8f0;
      padding-top: 24px;
    }
    
    .footer-bottom-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
      text-align: center;
    }
    
    .footer-copyright {
      font-size: 14px;
      color: #64748b;
    }
    
    .footer-links-bottom {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .footer-link-bottom {
      color: #64748b;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s ease;
    }
    
    .footer-link-bottom:hover {
      color: #1e3a8a;
    }
    
    @media (min-width: 768px) {
      .footer-bottom-content {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
