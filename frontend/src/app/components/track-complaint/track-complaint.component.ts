import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { ComplaintService } from '../../services/complaint.service';
import { Complaint } from '../../models/complaint.model';

@Component({
  selector: 'app-track-complaint',
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
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  template: `
    <div class="container">
      <mat-card class="track-form-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>track_changes</mat-icon>
            Track Your Complaint
          </mat-card-title>
          <mat-card-subtitle>Enter your complaint ID to check the status</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="trackForm" (ngSubmit)="onTrack()" *ngIf="!complaint">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Complaint ID</mat-label>
              <input matInput formControlName="complaintId" 
                     placeholder="Enter your complaint ID" 
                     autocomplete="off">
              <mat-icon matSuffix>search</mat-icon>
              <mat-error *ngIf="trackForm.get('complaintId')?.hasError('required')">
                Complaint ID is required
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" 
                      [disabled]="trackForm.invalid || isLoading">
                <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
                <span *ngIf="!isLoading">Track Complaint</span>
              </button>
              <button mat-button type="button" routerLink="/">Back to Home</button>
            </div>
          </form>

          <div *ngIf="complaint" class="complaint-details">
            <div class="complaint-header">
              <h2>Complaint Details</h2>
              <button mat-icon-button (click)="resetForm()">
                <mat-icon>close</mat-icon>
              </button>
            </div>

            <div class="complaint-info">
              <div class="info-row">
                <span class="label">Complaint ID:</span>
                <span class="value">{{complaint.id}}</span>
              </div>
              
              <div class="info-row">
                <span class="label">Status:</span>
                <mat-chip [class]="'status-badge ' + complaint.status">
                  {{complaint.status | titlecase}}
                </mat-chip>
              </div>
              
              <div class="info-row">
                <span class="label">Title:</span>
                <span class="value">{{complaint.title}}</span>
              </div>
              
              <div class="info-row">
                <span class="label">Category:</span>
                <span class="value">{{complaint.category}}</span>
              </div>
              
              <div class="info-row">
                <span class="label">Department:</span>
                <span class="value">{{complaint.department}}</span>
              </div>
              
              <div class="info-row">
                <span class="label">User Type:</span>
                <span class="value">{{complaint.userType | titlecase}}</span>
              </div>
              
              <div class="info-row" *ngIf="complaint.name">
                <span class="label">Name:</span>
                <span class="value">{{complaint.name}}</span>
              </div>
              
              <div class="info-row">
                <span class="label">Description:</span>
                <span class="value description">{{complaint.description}}</span>
              </div>
              
              <div class="info-row" *ngIf="complaint.fileUrls && complaint.fileUrls.length > 0">
                <span class="label">Attached Files:</span>
                <div class="file-links">
                  <a *ngFor="let fileUrl of complaint.fileUrls; let i = index" 
                     [href]="getFileUrl(fileUrl)" target="_blank" class="file-link">
                    <mat-icon>attachment</mat-icon>
                    File {{i + 1}}
                  </a>
                </div>
              </div>
              
              <div class="info-row" *ngIf="complaint.resolutionNote">
                <span class="label">Resolution Note:</span>
                <span class="value resolution">{{complaint.resolutionNote}}</span>
              </div>
              
              <div class="info-row">
                <span class="label">Submitted:</span>
                <span class="value">{{complaint.createdAt | date:'medium'}}</span>
              </div>
              
              <div class="info-row">
                <span class="label">Last Updated:</span>
                <span class="value">{{complaint.updatedAt | date:'medium'}}</span>
              </div>
            </div>

            <div class="action-buttons">
              <button mat-raised-button color="primary" (click)="resetForm()">
                Track Another Complaint
              </button>
              <button mat-button routerLink="/">Back to Home</button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .track-form-card {
      max-width: 800px;
      margin: 32px auto;
    }
    
    .form-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-top: 32px;
    }
    
    .complaint-details {
      margin-top: 24px;
    }
    
    .complaint-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .complaint-info {
      display: grid;
      gap: 16px;
    }
    
    .info-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .label {
      font-weight: 500;
      color: #666;
      font-size: 0.9rem;
    }
    
    .value {
      color: #333;
      word-break: break-word;
    }
    
    .value.description,
    .value.resolution {
      background-color: #f5f5f5;
      padding: 12px;
      border-radius: 4px;
      white-space: pre-wrap;
    }
    
    .file-links {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .file-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #1976d2;
      text-decoration: none;
      padding: 8px 12px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      background-color: #f9f9f9;
    }
    
    .file-link:hover {
      background-color: #e3f2fd;
      border-color: #1976d2;
    }
    
    .action-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e0e0e0;
    }
    
    @media (min-width: 768px) {
      .info-row {
        flex-direction: row;
        align-items: flex-start;
      }
      
      .label {
        min-width: 120px;
        flex-shrink: 0;
      }
    }
    
    @media (max-width: 768px) {
      .track-form-card {
        margin: 16px auto;
      }
      
      .form-actions,
      .action-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class TrackComplaintComponent {
  trackForm: FormGroup;
  complaint: Complaint | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService,
    private snackBar: MatSnackBar
  ) {
    this.trackForm = this.fb.group({
      complaintId: ['', Validators.required]
    });
  }

  onTrack(): void {
    if (this.trackForm.valid) {
      this.isLoading = true;
      const complaintId = this.trackForm.value.complaintId;

      this.complaintService.getComplaint(complaintId).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.complaint = response;
        },
        error: (error) => {
          this.isLoading = false;
          if (error.status === 404) {
            this.snackBar.open('Complaint not found. Please check your complaint ID.', 'Close', { duration: 5000 });
          } else {
            this.snackBar.open('Error retrieving complaint. Please try again.', 'Close', { duration: 5000 });
          }
          console.error('Error tracking complaint:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.complaint = null;
    this.trackForm.reset();
  }

  getFileUrl(fileUrl: string): string {
    // Handle both relative and absolute URLs
    if (fileUrl.startsWith('http')) {
      return fileUrl;
    }
    return `http://localhost:3000${fileUrl}`;
  }
}
