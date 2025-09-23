import mongoose, { Document, Schema } from 'mongoose';

// Comprehensive complaint interface
export interface IComplaint extends Document {
  id: string;
  userType: 'student' | 'faculty';
  name?: string; // Optional for students, required for faculty
  department: 'CSE' | 'ECE' | 'ME' | 'CE' | 'IT' | 'EEE' | 'Civil' | 'Chemical' | 'Aerospace' | 'Biotech' | 'Management' | 'Humanities';
  year?: string; // Required for students, not allowed for faculty
  category: string; // Different categories for student vs faculty
  title: string;
  description: string;
  fileUrls?: string[];
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  resolutionNote?: string;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const complaintSchema = new Schema<IComplaint>({
  id: {
    type: String,
    unique: true,
    trim: true,
    match: /^CMP-\d{4}-\d{8}$/ // Format: CMP-YYYY-XXXXXXXX
  },
  userType: {
    type: String,
    enum: ['student', 'faculty'],
    required: true
  },
  name: {
    type: String,
    trim: true,
    maxlength: 100,
    validate: {
      validator: function(this: IComplaint, value: string) {
        // For faculty, name is required
        if (this.userType === 'faculty' && (!value || value.trim() === '')) {
          return false;
        }
        return true;
      },
      message: 'Name is required for faculty complaints'
    }
  },
  department: {
    type: String,
    required: true,
    trim: true,
    enum: {
      values: ['CSE', 'ECE', 'ME', 'CE', 'IT', 'EEE', 'Civil', 'Chemical', 'Aerospace', 'Biotech', 'Management', 'Humanities'],
      message: 'Invalid department'
    }
  },
  year: {
    type: String,
    trim: true,
    enum: {
      values: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
      message: 'Invalid year'
    },
    validate: {
      validator: function(this: IComplaint, value: string) {
        // Year is required for students
        if (this.userType === 'student' && (!value || value.trim() === '')) {
          return false;
        }
        // Year should not be present for faculty
        if (this.userType === 'faculty' && value) {
          return false;
        }
        return true;
      },
      message: 'Year is required for students and not allowed for faculty'
    }
  },
  category: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(this: IComplaint, value: string) {
        const studentCategories = ['Infrastructure', 'Subject', 'Syllabus', 'Events', 'Clubs', 'Others'];
        const facultyCategories = ['Students', 'Infrastructure', 'Syllabus', 'Events', 'Administration', 'Others'];
        
        if (this.userType === 'student') {
          return studentCategories.includes(value);
        } else if (this.userType === 'faculty') {
          return facultyCategories.includes(value);
        }
        return false;
      },
      message: 'Invalid category for the selected user type'
    }
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
    minlength: 5
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000,
    minlength: 10
  },
  fileUrls: [{
    type: String,
    trim: true,
    validate: {
      validator: function(url: string) {
        return /^\/uploads\/[a-zA-Z0-9\-_]+\.(jpg|jpeg|png|gif|pdf|doc|docx|txt)$/i.test(url);
      },
      message: 'Invalid file URL format'
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'rejected'],
    default: 'pending'
  },
  resolutionNote: {
    type: String,
    default: '',
    maxlength: 1000,
    trim: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'complaints'
});

// Pre-save middleware to generate unique complaint ID
complaintSchema.pre('save', function(next) {
  if (this.isNew && !this.id) {
    const year = new Date().getFullYear();
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
    const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    this.id = `CMP-${year}-${timestamp}${randomNum}`;
  }
  next();
});

// Indexes for better query performance
complaintSchema.index({ status: 1 });
complaintSchema.index({ category: 1 });
complaintSchema.index({ department: 1 });
complaintSchema.index({ createdAt: -1 });
complaintSchema.index({ userType: 1 });
complaintSchema.index({ submittedAt: -1 });

// Compound indexes for common queries
complaintSchema.index({ userType: 1, status: 1 });
complaintSchema.index({ department: 1, status: 1 });
complaintSchema.index({ category: 1, status: 1 });

export default mongoose.model<IComplaint>('Complaint', complaintSchema);


