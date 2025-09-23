# Complaint Schemas Documentation

## Overview
This document describes the database schemas for both Student and Faculty complaint forms in the College Complaint Box system.

## Database Collection
- **Collection Name**: `complaints`
- **Database**: `college-complaint-box`

## Common Fields (Both Forms)

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `id` | String | Yes | Unique complaint ID | Format: `CMP-YYYY-XXX` (e.g., CMP-2025-001) |
| `userType` | String | Yes | Type of user | Enum: `['student', 'faculty']` |
| `department` | String | Yes | Department/Program | Enum: `['CSE', 'ECE', 'ME', 'CE', 'IT', 'EEE', 'Civil', 'Chemical', 'Aerospace', 'Biotech', 'Management', 'Humanities']` |
| `category` | String | Yes | Complaint category | See category options below |
| `title` | String | Yes | Complaint title | Min: 5 chars, Max: 200 chars |
| `description` | String | Yes | Detailed description | Min: 10 chars, Max: 2000 chars |
| `fileUrls` | Array[String] | No | Uploaded file URLs | Max 5 files, 5MB each |
| `status` | String | Yes | Complaint status | Enum: `['pending', 'in-progress', 'resolved', 'rejected']` |
| `resolutionNote` | String | No | Admin resolution notes | Max: 1000 chars |
| `submittedAt` | Date | Yes | Submission timestamp | Auto-generated |
| `createdAt` | Date | Yes | Creation timestamp | Auto-generated |
| `updatedAt` | Date | Yes | Last update timestamp | Auto-generated |

## Student Form Specific Fields

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `name` | String | No | Student name | Optional for anonymous complaints, Max: 100 chars |
| `year` | String | Yes | Academic year | Enum: `['1st Year', '2nd Year', '3rd Year', '4th Year']` |

### Student Categories
- `Infrastructure` - Issues with buildings, facilities, equipment
- `Subject` - Course-related concerns, curriculum issues
- `Syllabus` - Syllabus content, structure, or delivery
- `Events` - College events, activities, programs
- `Clubs` - Student clubs, societies, organizations
- `Others` - Any other concerns

## Faculty Form Specific Fields

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `name` | String | Yes | Faculty name | Required, Max: 100 chars |
| `year` | String | No | Not applicable | Not allowed for faculty |

### Faculty Categories
- `Students` - Student-related issues, behavior, performance
- `Infrastructure` - Facilities, equipment, resources
- `Syllabus` - Curriculum, course content, academic policies
- `Events` - College events, conferences, activities
- `Administration` - Administrative processes, policies, procedures
- `Others` - Any other concerns

## Automatic ID Generation

The system automatically generates unique complaint IDs using the following format:
- **Pattern**: `CMP-YYYY-XXX`
- **Example**: `CMP-2025-001`, `CMP-2025-002`, etc.
- **Generation**: Pre-save middleware ensures uniqueness
- **Retry Logic**: Up to 10 attempts to generate unique ID

## File Upload Support

### Allowed File Types
- **Images**: `.jpg`, `.jpeg`, `.png`, `.gif`
- **Documents**: `.pdf`, `.doc`, `.docx`, `.txt`

### File Constraints
- **Maximum files**: 5 per complaint
- **Maximum size**: 5MB per file
- **Storage**: Local `uploads/` directory
- **URL format**: `/uploads/filename-{timestamp}-{random}.{ext}`

## Database Indexes

### Single Field Indexes
- `id` (unique)
- `userType`
- `department`
- `category`
- `status`
- `submittedAt`
- `createdAt`

### Compound Indexes
- `{userType: 1, status: 1}`
- `{department: 1, status: 1}`
- `{category: 1, status: 1}`

## API Endpoints

### Submit Complaint
- **POST** `/api/complaints/submit`
- **Content-Type**: `multipart/form-data`
- **Body**: Form data with file uploads
- **Response**: Complaint object with generated ID

### Get Complaint by ID
- **GET** `/api/complaints/:id`
- **Response**: Single complaint object

### Get All Complaints (Admin)
- **GET** `/api/complaints`
- **Query Parameters**: `page`, `limit`, `status`, `category`, `department`
- **Response**: Paginated complaints list

### Update Complaint Status (Admin)
- **PUT** `/api/complaints/:id/status`
- **Body**: `{status: 'pending'|'in-progress'|'resolved'|'rejected'}`
- **Response**: Updated complaint object

## Validation Rules

### Student Form Validation
1. `userType` must be `'student'`
2. `name` is optional (allows anonymous complaints)
3. `year` is required and must be valid academic year
4. `category` must be from student categories list
5. `department` must be valid department
6. `title` and `description` must meet length requirements

### Faculty Form Validation
1. `userType` must be `'faculty'`
2. `name` is required (no anonymous faculty complaints)
3. `year` must not be present
4. `category` must be from faculty categories list
5. `department` must be valid department
6. `title` and `description` must meet length requirements

## Error Handling

### Validation Errors
- Returns detailed field-level error messages
- HTTP Status: `400 Bad Request`
- Response includes specific validation failures

### Duplicate ID Errors
- Automatic retry mechanism for ID generation
- HTTP Status: `400 Bad Request` if retry fails
- Message: "Complaint ID already exists. Please try again."

### File Upload Errors
- File type validation
- File size validation
- Storage error handling

## Example Usage

### Student Complaint Submission
```json
{
  "userType": "student",
  "name": "John Doe",
  "department": "CSE",
  "year": "3rd Year",
  "category": "Infrastructure",
  "title": "Broken Lab Equipment",
  "description": "The computers in Lab 3 are not working properly..."
}
```

### Faculty Complaint Submission
```json
{
  "userType": "faculty",
  "name": "Dr. Jane Smith",
  "department": "ECE",
  "category": "Students",
  "title": "Student Attendance Issues",
  "description": "Several students are consistently absent from classes..."
}
```

### Response Format
```json
{
  "message": "Complaint submitted successfully",
  "complaintId": "CMP-2025-001",
  "complaint": {
    "id": "CMP-2025-001",
    "userType": "student",
    "name": "John Doe",
    "department": "CSE",
    "year": "3rd Year",
    "category": "Infrastructure",
    "title": "Broken Lab Equipment",
    "description": "The computers in Lab 3 are not working properly...",
    "fileUrls": ["/uploads/file-1234567890-123456789.pdf"],
    "status": "pending",
    "submittedAt": "2025-01-15T10:30:00.000Z"
  }
}
```











