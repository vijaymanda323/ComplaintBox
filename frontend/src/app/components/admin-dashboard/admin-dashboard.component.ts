import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { ComplaintService } from '../../services/complaint.service';
import { Complaint } from '../../models/complaint.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule
  ],
  template: `
    <div class="admin-dashboard">
      <div class="container">
        <div class="dashboard-header">
          <h1>Admin Dashboard</h1>
          <div class="header-actions">
            <button mat-raised-button color="primary" (click)="exportData('csv')">
              <mat-icon>download</mat-icon>
              Export CSV
            </button>
            <button mat-raised-button color="accent" (click)="exportData('pdf')">
              <mat-icon>picture_as_pdf</mat-icon>
              Export PDF
            </button>
          </div>
        </div>

        <!-- Complaints Management -->
        <div class="complaints-content">
          <div class="filters-section">
            <div class="filter-box">
              <label>Status</label>
              <input type="text" 
                     [(ngModel)]="filters.status" 
                     (input)="applyFilters()"
                     placeholder="All Status"
                     class="filter-input">
            </div>

            <div class="filter-box">
              <label>Category</label>
              <input type="text" 
                     [(ngModel)]="filters.category" 
                     (input)="applyFilters()"
                     placeholder="All Categories"
                     class="filter-input">
            </div>

            <div class="filter-box">
              <label>Department</label>
              <input type="text" 
                     [(ngModel)]="filters.department" 
                     (input)="applyFilters()"
                     placeholder="All Departments"
                     class="filter-input">
            </div>

            <button mat-raised-button color="primary" (click)="loadComplaints()">
              <mat-icon>refresh</mat-icon>
              Refresh
            </button>
          </div>

          <mat-card class="complaints-table-card">
            <mat-card-content>
              <div class="table-container" *ngIf="!isLoading">
                <table mat-table [dataSource]="complaints" class="complaints-table">
                  <ng-container matColumnDef="id">
                    <th mat-header-cell *matHeaderCellDef>ID</th>
                    <td mat-cell *matCellDef="let complaint">{{complaint.id}}</td>
                  </ng-container>

                  <ng-container matColumnDef="title">
                    <th mat-header-cell *matHeaderCellDef>Title</th>
                    <td mat-cell *matCellDef="let complaint">{{complaint.title}}</td>
                  </ng-container>

                  <ng-container matColumnDef="category">
                    <th mat-header-cell *matHeaderCellDef>Category</th>
                    <td mat-cell *matCellDef="let complaint">{{complaint.category}}</td>
                  </ng-container>

                  <ng-container matColumnDef="department">
                    <th mat-header-cell *matHeaderCellDef>Department</th>
                    <td mat-cell *matCellDef="let complaint">{{complaint.department}}</td>
                  </ng-container>

                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Status</th>
                    <td mat-cell *matCellDef="let complaint">
                      <mat-chip [class]="'status-badge ' + complaint.status">
                        {{complaint.status | titlecase}}
                      </mat-chip>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="createdAt">
                    <th mat-header-cell *matHeaderCellDef>Created</th>
                    <td mat-cell *matCellDef="let complaint">{{complaint.createdAt | date:'short'}}</td>
                  </ng-container>

                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Actions</th>
                    <td mat-cell *matCellDef="let complaint">
                      <button mat-icon-button [matMenuTriggerFor]="actionMenu">
                        <mat-icon>more_vert</mat-icon>
                      </button>
                      <mat-menu #actionMenu="matMenu">
                        <button mat-menu-item (click)="updateStatus(complaint, 'in-progress')" 
                                *ngIf="complaint.status === 'pending'">
                          <mat-icon>play_arrow</mat-icon>
                          Mark In Progress
                        </button>
                        <button mat-menu-item (click)="updateStatus(complaint, 'resolved')" 
                                *ngIf="complaint.status !== 'resolved'">
                          <mat-icon>check_circle</mat-icon>
                          Mark Resolved
                        </button>
                        <button mat-menu-item (click)="updateStatus(complaint, 'rejected')" 
                                *ngIf="complaint.status !== 'rejected'">
                          <mat-icon>cancel</mat-icon>
                          Reject
                        </button>
                        <button mat-menu-item (click)="deleteComplaint(complaint)">
                          <mat-icon>delete</mat-icon>
                          Delete
                        </button>
                      </mat-menu>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
                      (click)="viewComplaintDetails(row)" 
                      class="clickable-row"></tr>
                </table>

                <mat-paginator [length]="totalComplaints"
                               [pageSize]="pageSize"
                               [pageSizeOptions]="[5, 10, 25, 50]"
                               (page)="onPageChange($event)"
                               showFirstLastButtons>
                </mat-paginator>
              </div>

              <div class="loading-container" *ngIf="isLoading">
                <mat-spinner></mat-spinner>
                <p>Loading complaints...</p>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Complaint Details Modal -->
          <div class="complaint-details-modal" *ngIf="selectedComplaint" (click)="closeComplaintDetails()">
            <div class="modal-content" (click)="$event.stopPropagation()">
              <div class="modal-header">
                <h2>Complaint Details</h2>
                <button mat-icon-button (click)="closeComplaintDetails()" class="close-btn">
                  <mat-icon>close</mat-icon>
                </button>
              </div>
              
              <div class="modal-body" *ngIf="selectedComplaint">
                <div class="details-grid">
                  <div class="detail-item">
                    <label>Complaint ID:</label>
                    <span>{{selectedComplaint.id}}</span>
                  </div>
                  
                  <div class="detail-item">
                    <label>Status:</label>
                    <mat-chip [class]="'status-badge ' + selectedComplaint.status">
                      {{selectedComplaint.status | titlecase}}
                    </mat-chip>
                  </div>
                  
                  <div class="detail-item">
                    <label>Title:</label>
                    <span>{{selectedComplaint.title}}</span>
                  </div>
                  
                  <div class="detail-item">
                    <label>Category:</label>
                    <span>{{selectedComplaint.category}}</span>
                  </div>
                  
                  <div class="detail-item">
                    <label>Department:</label>
                    <span>{{selectedComplaint.department}}</span>
                  </div>
                  
                  <div class="detail-item">
                    <label>User Type:</label>
                    <span>{{selectedComplaint.userType | titlecase}}</span>
                  </div>
                  
                  <div class="detail-item" *ngIf="selectedComplaint.name">
                    <label>Name:</label>
                    <span>{{selectedComplaint.name}}</span>
                  </div>
                  
                  <div class="detail-item" *ngIf="selectedComplaint.year">
                    <label>Year:</label>
                    <span>{{selectedComplaint.year}}</span>
                  </div>
                  
                  <div class="detail-item full-width">
                    <label>Description:</label>
                    <div class="description-text">{{selectedComplaint.description}}</div>
                  </div>
                  
                  <div class="detail-item" *ngIf="selectedComplaint.fileUrls && selectedComplaint.fileUrls.length > 0">
                    <label>Attached Files:</label>
                    <div class="file-links">
                      <a *ngFor="let fileUrl of selectedComplaint.fileUrls; let i = index" 
                         [href]="getFileUrl(fileUrl)" target="_blank" class="file-link">
                        <mat-icon>attachment</mat-icon>
                        File {{i + 1}}
                      </a>
                    </div>
                  </div>
                  
                  <div class="detail-item" *ngIf="selectedComplaint.resolutionNote">
                    <label>Resolution Note:</label>
                    <div class="resolution-text">{{selectedComplaint.resolutionNote}}</div>
                  </div>
                  
                  <div class="detail-item">
                    <label>Submitted:</label>
                    <span>{{selectedComplaint.createdAt | date:'medium'}}</span>
                  </div>
                  
                  <div class="detail-item">
                    <label>Last Updated:</label>
                    <span>{{selectedComplaint.updatedAt | date:'medium'}}</span>
                  </div>
                </div>
                
                <div class="modal-actions">
                  <button mat-raised-button color="primary" 
                          (click)="resolveComplaint(selectedComplaint)" 
                          *ngIf="selectedComplaint.status === 'pending'"
                          class="resolve-btn">
                    <mat-icon>check_circle</mat-icon>
                    Resolve Complaint
                  </button>
                  <button mat-button (click)="closeComplaintDetails()" class="close-btn">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      padding: 24px 0;
    }
    
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }

    .dashboard-header h1 {
      margin: 0;
      color: white !important;
      font-size: 2rem;
      font-weight: 600;
    }
    
    .header-actions {
      display: flex;
      gap: 16px;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }
    
    .stat-card {
      text-align: center;
    }
    
    .stat-card.pending {
      background-color: #fff3e0;
    }
    
    .stat-card.in-progress {
      background-color: #e3f2fd;
    }
    
    .stat-card.resolved {
      background-color: #e8f5e8;
    }
    
    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      color: #1976d2;
    }
    
    .stat-label {
      color: #666;
      margin-top: 8px;
    }
    
    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
    }
    
    .chart-card {
      min-height: 300px;
    }
    
    .filters-section {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
      align-items: center;
    }

    .filter-box {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .filter-box label {
      font-weight: 500;
      color: white !important;
      font-size: 14px;
    }

    .filter-input {
      padding: 12px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      background-color: white;
      font-size: 14px;
      color: #333;
      transition: border-color 0.3s ease;
      min-width: 200px;
    }

    .filter-input:focus {
      outline: none;
      border-color: #2196f3;
      box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
    }

    .filter-input::placeholder {
      color: #999;
    }

    .clickable-row {
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .clickable-row:hover {
      background-color: #f5f5f5;
    }
    
    .complaints-table-card {
      margin-top: 16px;
    }
    
    .table-container {
      overflow-x: auto;
    }
    
    .complaints-table {
      width: 100%;
    }

    .complaints-table td {
      color: #333;
    }

    .complaints-table td:nth-child(3), /* Category column */
    .complaints-table td:nth-child(4), /* Department column */
    .complaints-table td:nth-child(5) { /* Status column */
      color: white !important;
      font-weight: 500;
    }

    .complaints-table th {
      color: #333;
      font-weight: 600;
    }

    .complaints-table th:nth-child(3), /* Category header */
    .complaints-table th:nth-child(4), /* Department header */
    .complaints-table th:nth-child(5) { /* Status header */
      color: white !important;
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px;
    }

    /* Modal Styles */
    .complaint-details-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      max-width: 800px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      border-bottom: 1px solid #e0e0e0;
      background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
      border-radius: 12px 12px 0 0;
    }

    .modal-header h2 {
      margin: 0;
      color: #333;
      font-size: 1.5rem;
    }

    .modal-body {
      padding: 24px;
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .detail-item.full-width {
      grid-column: 1 / -1;
    }

    .detail-item label {
      font-weight: 600;
      color: #666;
      font-size: 0.9rem;
    }

    .detail-item span {
      color: #333;
      font-size: 1rem;
    }

    .description-text, .resolution-text {
      background-color: #f8f8f8;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      white-space: pre-wrap;
      word-break: break-word;
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
      transition: all 0.2s ease;
    }

    .file-link:hover {
      background-color: #e3f2fd;
      border-color: #1976d2;
    }

    .modal-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      padding-top: 24px;
      border-top: 1px solid #e0e0e0;
    }

    .resolve-btn {
      background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
      color: white;
      font-weight: 600;
    }

    .resolve-btn:hover {
      background: linear-gradient(135deg, #388e3c 0%, #2e7d32 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    }
    
    @media (max-width: 768px) {
      .dashboard-header {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
      }
      
      .header-actions {
        justify-content: center;
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .charts-grid {
        grid-template-columns: 1fr;
      }
      
      .filters-section {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  complaints: Complaint[] = [];
  isLoading = false;
  totalComplaints = 0;
  pageSize = 10;
  currentPage = 0;
  selectedComplaint: Complaint | null = null;
  
  displayedColumns: string[] = ['id', 'title', 'category', 'department', 'status', 'createdAt', 'actions'];
  
  filters = {
    status: '',
    category: '',
    department: ''
  };

  constructor(
    private complaintService: ComplaintService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.isLoading = true;
    const params = {
      page: this.currentPage + 1,
      limit: this.pageSize,
      ...this.filters
    };

    this.complaintService.getAllComplaints(params).subscribe({
      next: (response) => {
        this.complaints = response.complaints;
        this.totalComplaints = response.total;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Error loading complaints', 'Close', { duration: 3000 });
        console.error('Error loading complaints:', error);
      }
    });
  }

  applyFilters(): void {
    this.currentPage = 0;
    this.loadComplaints();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadComplaints();
  }

  updateStatus(complaint: Complaint, newStatus: string): void {
    this.complaintService.updateComplaintStatus(complaint.id, newStatus).subscribe({
      next: () => {
        this.snackBar.open('Status updated successfully', 'Close', { duration: 3000 });
        this.loadComplaints();
      },
      error: (error) => {
        this.snackBar.open('Error updating status', 'Close', { duration: 3000 });
        console.error('Error updating status:', error);
      }
    });
  }

  deleteComplaint(complaint: Complaint): void {
    if (confirm('Are you sure you want to delete this complaint?')) {
      this.complaintService.deleteComplaint(complaint.id).subscribe({
        next: () => {
          this.snackBar.open('Complaint deleted successfully', 'Close', { duration: 3000 });
          this.loadComplaints();
        },
        error: (error) => {
          this.snackBar.open('Error deleting complaint', 'Close', { duration: 3000 });
          console.error('Error deleting complaint:', error);
        }
      });
    }
  }

  exportData(format: 'csv' | 'pdf'): void {
    if (format === 'csv') {
      this.exportToCSV();
    } else if (format === 'pdf') {
      this.exportToPDF();
    }
  }

  exportToCSV(): void {
    if (this.complaints.length === 0) {
      this.snackBar.open('No complaints to export', 'Close', { duration: 3000 });
      return;
    }

    const headers = ['ID', 'Title', 'Category', 'Department', 'Status', 'User Type', 'Name', 'Year', 'Created At', 'Updated At'];
    const csvContent = [
      headers.join(','),
      ...this.complaints.map(complaint => [
        complaint.id,
        `"${complaint.title.replace(/"/g, '""')}"`,
        complaint.category,
        complaint.department,
        complaint.status,
        complaint.userType,
        complaint.name || '',
        complaint.year || '',
        new Date(complaint.createdAt).toLocaleDateString(),
        new Date(complaint.updatedAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `complaints_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    this.snackBar.open('CSV file exported successfully!', 'Close', { duration: 3000 });
  }

  exportToPDF(): void {
    if (this.complaints.length === 0) {
      this.snackBar.open('No complaints to export', 'Close', { duration: 3000 });
      return;
    }

    // Create a simple HTML table for PDF generation
    const tableHtml = `
      <html>
        <head>
          <title>Complaints Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .header { text-align: center; margin-bottom: 20px; }
            .date { color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Complaints Report</h1>
            <p class="date">Generated on: ${new Date().toLocaleDateString()}</p>
            <p>Total Complaints: ${this.complaints.length}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Department</th>
                <th>Status</th>
                <th>User Type</th>
                <th>Name</th>
                <th>Year</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              ${this.complaints.map(complaint => `
                <tr>
                  <td>${complaint.id}</td>
                  <td>${complaint.title}</td>
                  <td>${complaint.category}</td>
                  <td>${complaint.department}</td>
                  <td>${complaint.status}</td>
                  <td>${complaint.userType}</td>
                  <td>${complaint.name || 'N/A'}</td>
                  <td>${complaint.year || 'N/A'}</td>
                  <td>${new Date(complaint.createdAt).toLocaleDateString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    // Open in new window for printing/saving as PDF
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(tableHtml);
      printWindow.document.close();
      printWindow.focus();
      
      // Wait for content to load, then trigger print dialog
      setTimeout(() => {
        printWindow.print();
        this.snackBar.open('PDF export ready! Use browser print dialog to save as PDF.', 'Close', { duration: 5000 });
      }, 500);
    } else {
      this.snackBar.open('Please allow popups to export PDF', 'Close', { duration: 3000 });
    }
  }

  viewComplaintDetails(complaint: Complaint): void {
    this.selectedComplaint = complaint;
  }

  closeComplaintDetails(): void {
    this.selectedComplaint = null;
  }

  resolveComplaint(complaint: Complaint): void {
    this.complaintService.updateComplaintStatus(complaint.id, 'resolved').subscribe({
      next: () => {
        this.snackBar.open('Complaint resolved successfully!', 'Close', { duration: 3000 });
        this.loadComplaints();
        this.closeComplaintDetails();
      },
      error: (error) => {
        this.snackBar.open('Error resolving complaint', 'Close', { duration: 3000 });
        console.error('Error resolving complaint:', error);
      }
    });
  }

  getFileUrl(fileUrl: string): string {
    // Handle both relative and absolute URLs
    if (fileUrl.startsWith('http')) {
      return fileUrl;
    }
    
    // Check if we're in production (Vercel)
    if (window.location.hostname.includes('vercel.app') || window.location.hostname.includes('vercel.com')) {
      return fileUrl; // Vercel handles static files automatically
    }
    
    // Development
    return `http://localhost:3000${fileUrl}`;
  }
}
