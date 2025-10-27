export interface Complaint {
  _id: string;
  id: string;
  userType: 'student' | 'faculty';
  name?: string;
  email: string;
  department: string;
  year?: string;
  category: string;
  title: string;
  description: string;
  fileUrls?: string[];
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  resolutionNote?: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ComplaintFormData {
  id?: string;
  userType: 'student' | 'faculty';
  name?: string;
  email: string;
  department: string;
  year?: string;
  category: string;
  title: string;
  description: string;
  files?: File[];
  status?: string;
  submittedAt?: string;
}

export interface ComplaintResponse {
  message: string;
  complaintId: string;
  data: Complaint;
}

export interface ComplaintsResponse {
  message: string;
  data: Complaint[];
  pagination: {
    current: number;
    pages: number;
    total: number;
  };
}

export interface AnalyticsData {
  summary: {
    total: number;
    pending: number;
    inProgress: number;
    resolved: number;
    rejected: number;
  };
  byCategory: Array<{ _id: string; count: number }>;
  byDepartment: Array<{ _id: string; count: number }>;
  byRole: Array<{ _id: string; count: number }>;
  monthlyTrend: Array<{ _id: { year: number; month: number }; count: number }>;
}


