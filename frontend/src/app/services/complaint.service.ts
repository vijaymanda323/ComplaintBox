import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint, ComplaintFormData, ComplaintResponse, ComplaintsResponse, AnalyticsData } from '../models/complaint.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = this.getApiUrl();

  constructor(private http: HttpClient) {}

  private getApiUrl(): string {
    // Check if we're in production (Vercel)
    if (window.location.hostname.includes('vercel.app') || window.location.hostname.includes('vercel.com')) {
      return '/api';
    }
    // Development
    return 'http://localhost:3000/api';
  }

  submitComplaint(formData: ComplaintFormData): Observable<ComplaintResponse> {
    const form = new FormData();
    form.append('userType', formData.userType);
    if (formData.name) form.append('name', formData.name);
    form.append('department', formData.department);
    if (formData.year) form.append('year', formData.year);
    form.append('category', formData.category);
    form.append('title', formData.title);
    form.append('description', formData.description);
    if (formData.files && formData.files.length > 0) {
      formData.files.forEach((file, index) => {
        form.append(`files`, file);
      });
    }

    return this.http.post<ComplaintResponse>(`${this.apiUrl}/complaints/submit`, form);
  }

  getComplaint(id: string): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.apiUrl}/complaints/${id}`);
  }

  getAllComplaints(params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
    department?: string;
  }): Observable<{ complaints: Complaint[], totalPages: number, currentPage: number, total: number }> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key as keyof typeof params] !== undefined) {
          httpParams = httpParams.set(key, params[key as keyof typeof params]!.toString());
        }
      });
    }

    return this.http.get<{ complaints: Complaint[], totalPages: number, currentPage: number, total: number }>(`${this.apiUrl}/complaints`, { params: httpParams });
  }

  updateComplaintStatus(id: string, status: string): Observable<{ message: string, complaint: Complaint }> {
    return this.http.put<{ message: string, complaint: Complaint }>(`${this.apiUrl}/complaints/${id}/status`, {
      status
    });
  }

  deleteComplaint(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/complaints/${id}`);
  }

  getAnalytics(): Observable<{ message: string; data: AnalyticsData }> {
    return this.http.get<{ message: string; data: AnalyticsData }>(`${this.apiUrl}/complaints/analytics/summary`);
  }
}


