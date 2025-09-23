import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ComplaintService } from '../../services/complaint.service';
import { ComplaintFormData } from '../../models/complaint.model';

@Component({
  selector: 'app-submit-complaint',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTabsModule
  ],
  template: `
    <div class="submit-complaint-container">
      <div class="page-header">
        <h1>Submit Complaint</h1>
        <p>Share your concerns and help us improve our college</p>
      </div>

      <!-- User Type Selection -->
      <div class="user-type-selection">
        <button 
          mat-raised-button 
          [class.active]="selectedUserType === 'student'"
          (click)="selectUserType('student')"
          class="user-type-btn student-btn">
          <mat-icon>school</mat-icon>
          <span>Student</span>
        </button>
        <button 
          mat-raised-button 
          [class.active]="selectedUserType === 'faculty'"
          (click)="selectUserType('faculty')"
          class="user-type-btn faculty-btn">
          <mat-icon>person</mat-icon>
          <span>Faculty</span>
        </button>
      </div>


      <!-- Complaint Form -->
      <mat-card class="complaint-form-card">
        <mat-card-content>
          <form [formGroup]="complaintForm" (ngSubmit)="onSubmit()" *ngIf="!isSubmitted">
            
            
            <!-- Form Title -->
            <h3 class="form-title">{{selectedUserType === 'student' ? 'Student Complaint Form' : 'Faculty Complaint Form'}}</h3>
            
            <!-- Name Field -->
            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{selectedUserType === 'student' ? 'Name (Optional for Anonymous)' : 'Name *'}}</mat-label>
                <input matInput formControlName="name" 
                       [placeholder]="selectedUserType === 'student' ? 'Enter your name or leave blank for anonymous' : 'Enter your full name'">
                <mat-hint *ngIf="selectedUserType === 'student'">You can submit anonymously by leaving this field empty</mat-hint>
                <mat-error *ngIf="complaintForm.get('name')?.hasError('required')">
                  Name is required
                </mat-error>
              </mat-form-field>
            </div>

            <!-- Department Field -->
            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Department *</mat-label>
                <mat-select formControlName="department" required>
                  <mat-option value="CSE">Computer Science Engineering (CSE)</mat-option>
                  <mat-option value="ECE">Electronics & Communication Engineering (ECE)</mat-option>
                  <mat-option value="ME">Mechanical Engineering (ME)</mat-option>
                  <mat-option value="CE">Civil Engineering (CE)</mat-option>
                  <mat-option value="EE">Electrical Engineering (EE)</mat-option>
                  <mat-option value="IT">Information Technology (IT)</mat-option>
                  <mat-option value="Other">Other</mat-option>
                </mat-select>
                <mat-error *ngIf="complaintForm.get('department')?.hasError('required')">
                  Department is required
                </mat-error>
              </mat-form-field>
            </div>

            <!-- Year Field (Student Only) -->
            <div class="form-row" *ngIf="selectedUserType === 'student'">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Year *</mat-label>
                <mat-select formControlName="year" required>
                  <mat-option value="1st Year">1st Year</mat-option>
                  <mat-option value="2nd Year">2nd Year</mat-option>
                  <mat-option value="3rd Year">3rd Year</mat-option>
                  <mat-option value="4th Year">4th Year</mat-option>
                </mat-select>
                <mat-error *ngIf="complaintForm.get('year')?.hasError('required')">
                  Year is required
                </mat-error>
              </mat-form-field>
            </div>

            <!-- Category Field -->
            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Category *</mat-label>
                <mat-select formControlName="category" required>
                  <!-- Student Categories -->
                  <ng-container *ngIf="selectedUserType === 'student'">
                    <mat-option value="Infrastructure">Infrastructure</mat-option>
                    <mat-option value="Subject">Subject</mat-option>
                    <mat-option value="Syllabus">Syllabus</mat-option>
                    <mat-option value="Events">Events</mat-option>
                    <mat-option value="Clubs">Clubs</mat-option>
                    <mat-option value="Others">Others</mat-option>
                  </ng-container>
                  <!-- Faculty Categories -->
                  <ng-container *ngIf="selectedUserType === 'faculty'">
                    <mat-option value="Students">Students</mat-option>
                    <mat-option value="Infrastructure">Infrastructure</mat-option>
                    <mat-option value="Syllabus">Syllabus</mat-option>
                    <mat-option value="Events">Events</mat-option>
                    <mat-option value="Others">Others</mat-option>
                  </ng-container>
                </mat-select>
                <mat-error *ngIf="complaintForm.get('category')?.hasError('required')">
                  Category is required
                </mat-error>
              </mat-form-field>
            </div>

            <!-- Common Fields -->
            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Complaint Title *</mat-label>
                <input matInput formControlName="title" placeholder="Brief title of your complaint" maxlength="200">
                <mat-hint align="end">{{complaintForm.get('title')?.value?.length || 0}}/200</mat-hint>
                <mat-error *ngIf="complaintForm.get('title')?.hasError('required')">
                  Complaint title is required
                </mat-error>
                <mat-error *ngIf="complaintForm.get('title')?.hasError('maxlength')">
                  Title must be less than 200 characters
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Complaint Description *</mat-label>
                <textarea matInput formControlName="description" 
                         placeholder="Detailed description of your complaint" 
                         rows="6" maxlength="2000"></textarea>
                <mat-hint align="end">{{complaintForm.get('description')?.value?.length || 0}}/2000</mat-hint>
                <mat-error *ngIf="complaintForm.get('description')?.hasError('required')">
                  Complaint description is required
                </mat-error>
                <mat-error *ngIf="complaintForm.get('description')?.hasError('minlength')">
                  Description must be at least 10 characters long
                </mat-error>
                <mat-error *ngIf="complaintForm.get('description')?.hasError('maxlength')">
                  Description must be less than 2000 characters
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <div class="file-upload-section">
                <label class="file-upload-label">Supporting Documents (Optional)</label>
                <div class="file-upload-container">
                  <input type="file" 
                         (change)="onFileSelected($event)" 
                         accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt" 
                         multiple
                         class="file-input">
                  <div class="file-upload-hint">Upload images, PDFs, or documents (Max 5MB each)</div>
                  <div class="selected-files" *ngIf="selectedFiles.length > 0">
                    <div class="file-item" *ngFor="let file of selectedFiles; let i = index">
                      <mat-icon>attachment</mat-icon>
                      <span>{{file.name}}</span>
                      <button mat-icon-button (click)="removeFile(i)" class="remove-file-btn">
                        <mat-icon>close</mat-icon>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" 
                      [disabled]="complaintForm.invalid || isLoading" class="submit-btn">
                <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
                <mat-icon *ngIf="!isLoading">send</mat-icon>
                <span *ngIf="!isLoading">Submit Complaint</span>
              </button>
              <button mat-button type="button" routerLink="/" class="cancel-btn">
                <mat-icon>arrow_back</mat-icon>
                <span>Back to Home</span>
              </button>
            </div>
          </form>

          <!-- Success Message -->
          <div *ngIf="isSubmitted" class="success-message">
            <div class="success-icon">
              <mat-icon>check_circle</mat-icon>
            </div>
            <h2>Complaint Submitted Successfully!</h2>
            <p>Your complaint has been submitted and is under review.</p>
            <div class="complaint-id-display">
              <strong>Complaint ID:</strong> 
              <span class="complaint-id">{{submittedComplaintId}}</span>
            </div>
            <div class="action-buttons">
              <button mat-raised-button color="primary" routerLink="/track" class="track-btn">
                <mat-icon>track_changes</mat-icon>
                <span>Track Complaint</span>
              </button>
              <button mat-button routerLink="/" class="home-btn">
                <mat-icon>home</mat-icon>
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .submit-complaint-container {
      min-height: 100vh;
      padding: 24px;
      background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
    }

    .page-header {
      text-align: center;
      margin-bottom: 32px;
      color: #000000;
    }

    .page-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 8px;
      color: #000000;
    }

    .page-header p {
      font-size: 1.1rem;
      color: #333333;
      margin: 0;
    }

    .user-type-selection {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-bottom: 32px;
    }

    .user-type-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px 32px;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .student-btn {
      background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
      color: #000000;
      border: 2px solid #cccccc;
    }

    .faculty-btn {
      background: linear-gradient(135deg, #e0e0e0 0%, #d0d0d0 100%);
      color: #000000;
      border: 2px solid #999999;
    }

    .user-type-btn.active {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      border-color: #000000;
      background: linear-gradient(135deg, #000000 0%, #333333 100%);
      color: #ffffff;
    }

    .user-type-btn:hover:not(.active) {
      transform: translateY(-1px);
      opacity: 0.9;
    }


    .complaint-form-card {
      max-width: 900px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .form-title {
      color: #000000;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 24px;
      text-align: center;
      padding-bottom: 12px;
      border-bottom: 2px solid #cccccc;
    }

    .form-section {
      animation: fadeIn 0.3s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .form-row {
      margin-bottom: 24px;
      display: flex;
      gap: 16px;
    }

    .full-width {
      flex: 1;
    }

    .half-width {
      flex: 1;
    }

    .form-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid #e0e0e0;
    }

    .submit-btn {
      background: linear-gradient(135deg, #000000 0%, #333333 100%);
      color: #ffffff;
      padding: 12px 32px;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      border: 2px solid #000000;
    }

    .submit-btn:hover {
      background: linear-gradient(135deg, #333333 0%, #666666 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }

    .cancel-btn {
      color: #ffffff;
      border: 1px solid #333333;
      background: linear-gradient(135deg, #333333 0%, #555555 100%);
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 8px;
    }

    .cancel-btn:hover {
      background: linear-gradient(135deg, #555555 0%, #777777 100%);
      border-color: #000000;
    }

    .success-message {
      text-align: center;
      padding: 48px 24px;
      color: #000000;
    }

    .success-icon {
      margin-bottom: 24px;
    }

    .success-icon mat-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: #000000;
    }

    .success-message h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 16px;
      color: #000000;
    }

    .success-message p {
      font-size: 1.1rem;
      color: #333333;
      margin-bottom: 32px;
    }

    .complaint-id-display {
      background: #f0f0f0;
      border: 1px solid #cccccc;
      border-radius: 12px;
      padding: 20px;
      margin: 24px 0;
      display: inline-block;
    }

    .complaint-id-display strong {
      color: #333333;
      font-size: 1.1rem;
    }

    .complaint-id {
      font-family: 'Courier New', monospace;
      font-size: 1.3rem;
      font-weight: 700;
      color: #000000;
      margin-left: 8px;
    }

    .action-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-top: 32px;
    }

    .track-btn {
      background: linear-gradient(135deg, #333333 0%, #000000 100%);
      color: white;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .home-btn {
      color: #ffffff;
      border: 1px solid #333333;
      background: linear-gradient(135deg, #333333 0%, #555555 100%);
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 8px;
    }

    .home-btn:hover {
      background: linear-gradient(135deg, #555555 0%, #777777 100%);
      border-color: #000000;
    }

    /* File Upload Styling */
    .file-upload-section {
      width: 100%;
    }

    .file-upload-label {
      display: block;
      color: #333333;
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .file-upload-container {
      border: 2px dashed #cccccc;
      border-radius: 12px;
      padding: 20px;
      background: #f8f8f8;
      transition: all 0.3s ease;
    }

    .file-upload-container:hover {
      border-color: #000000;
      background: #f0f0f0;
    }

    .file-input {
      width: 100%;
      padding: 12px;
      border: 1px solid #cccccc;
      border-radius: 8px;
      background: #ffffff;
      color: #000000;
      font-size: 14px;
      margin-bottom: 12px;
    }

    .file-input:focus {
      outline: none;
      border-color: #000000;
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
    }

    .file-upload-hint {
      color: #666666;
      font-size: 0.75rem;
      margin-bottom: 16px;
    }

    .selected-files {
      margin-top: 16px;
    }

    .file-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: #ffffff;
      border: 1px solid #cccccc;
      border-radius: 8px;
      margin-bottom: 8px;
    }

    .file-item mat-icon {
      color: #000000;
    }

    .file-item span {
      flex: 1;
      color: #000000;
      font-size: 14px;
    }

    .remove-file-btn {
      color: #ff4444;
      min-width: 32px;
      width: 32px;
      height: 32px;
    }

    .remove-file-btn:hover {
      background: rgba(255, 68, 68, 0.2);
    }

    /* Form Field Styling */
    ::ng-deep .mat-mdc-form-field {
      .mat-mdc-text-field-wrapper {
        background-color: #ffffff;
        border-radius: 12px;
      }
      
      .mat-mdc-form-field-focus-overlay {
        background-color: transparent;
      }
      
      .mat-mdc-form-field-outline {
        color: #cccccc;
      }
      
      .mat-mdc-form-field-outline-thick {
        color: #000000;
      }
      
      .mat-mdc-input-element {
        color: #000000;
      }
      
      .mat-mdc-form-field-label {
        color: #666666;
      }
      
      .mat-mdc-form-field-label.mdc-floating-label--float-above {
        color: #000000;
      }
      
      .mat-mdc-select-value {
        color: #000000;
      }
      
      .mat-mdc-select-placeholder {
        color: #666666;
      }
      
      .mat-mdc-form-field-hint {
        color: #666666;
      }
      
      .mat-mdc-form-field-error {
        color: #ff4444;
      }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .submit-complaint-container {
        padding: 16px;
      }

      .page-header h1 {
        font-size: 2rem;
      }

      .user-type-selection {
        flex-direction: column;
        align-items: center;
      }

      .user-type-btn {
        width: 100%;
        max-width: 300px;
      }

      .form-row {
        flex-direction: column;
        gap: 0;
      }

      .form-actions {
        flex-direction: column;
        align-items: center;
      }

      .action-buttons {
        flex-direction: column;
        align-items: center;
      }

      .complaint-form-card {
        margin: 0;
      }
    }

    @media (max-width: 480px) {
      .page-header h1 {
        font-size: 1.8rem;
      }

      .user-type-btn {
        padding: 12px 24px;
        font-size: 1rem;
      }

      .submit-btn {
        padding: 10px 24px;
        font-size: 1rem;
      }
    }
  `]
})
export class SubmitComplaintComponent implements OnInit {
  selectedUserType: 'student' | 'faculty' = 'student';
  complaintForm!: FormGroup;
  selectedFiles: File[] = [];
  isLoading = false;
  isSubmitted = false;
  submittedComplaintId: string = '';

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.selectUserType('student');
    console.log('Component initialized');
    console.log('Selected user type:', this.selectedUserType);
    console.log('Form initialized:', !!this.complaintForm);
  }

  initializeForm(): void {
    this.complaintForm = this.fb.group({
      name: [''],
      department: ['', Validators.required],
      year: [''],
      category: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]]
    });
    console.log('Form created:', this.complaintForm);
  }

  selectUserType(userType: 'student' | 'faculty'): void {
    console.log('Switching to user type:', userType);
    this.selectedUserType = userType;
    
    // Update validators based on user type
    const nameControl = this.complaintForm.get('name');
    const yearControl = this.complaintForm.get('year');
    
    if (userType === 'student') {
      // Name is optional for students (anonymous allowed)
      nameControl?.clearValidators();
      // Year is required for students
      yearControl?.setValidators([Validators.required]);
    } else {
      // Name is required for faculty
      nameControl?.setValidators([Validators.required]);
      // Year is not applicable for faculty
      yearControl?.clearValidators();
    }
    
    // Update form validation
    nameControl?.updateValueAndValidity();
    yearControl?.updateValueAndValidity();
    
    // Clear form values but keep the form structure
    this.complaintForm.patchValue({
      name: '',
      department: '',
      year: '',
      category: '',
      title: '',
      description: ''
    });
    
    console.log('Form after switch:', this.complaintForm.value);
    console.log('Selected user type after switch:', this.selectedUserType);
  }

  onFileSelected(event: any): void {
    const files = Array.from(event.target.files);
    
    files.forEach((file: any) => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        this.snackBar.open(`File "${file.name}" is too large. Maximum size is 5MB.`, 'Close', { duration: 5000 });
        return;
      }
      this.selectedFiles.push(file);
    });
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  generateComplaintId(): string {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `CMP-${year}-${randomNum}`;
  }

  onSubmit(): void {
    if (this.complaintForm.valid) {
      this.isLoading = true;
      
      const complaintId = this.generateComplaintId();
      
      const formData: ComplaintFormData = {
        id: complaintId,
        userType: this.selectedUserType,
        name: this.complaintForm.value.name,
        department: this.complaintForm.value.department,
        year: this.complaintForm.value.year,
        category: this.complaintForm.value.category,
        title: this.complaintForm.value.title,
        description: this.complaintForm.value.description,
        files: this.selectedFiles.length > 0 ? this.selectedFiles : undefined,
        status: 'Submitted',
        submittedAt: new Date().toISOString()
      };

      this.complaintService.submitComplaint(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.isSubmitted = true;
          this.submittedComplaintId = complaintId;
          
          // Show success message
          this.snackBar.open(
            `Complaint submitted successfully! ID: ${complaintId}`, 
            'Close', 
            { duration: 8000 }
          );
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open('Error submitting complaint. Please try again.', 'Close', { duration: 5000 });
          console.error('Error submitting complaint:', error);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.complaintForm.controls).forEach(key => {
        this.complaintForm.get(key)?.markAsTouched();
      });
    }
  }
}