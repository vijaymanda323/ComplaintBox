# Quick Setup Guide

## Prerequisites
- Node.js (v16+)
- MongoDB (v4.4+)
- npm or yarn

## 1. Backend Setup

```bash
cd backend
npm install
cp env.example .env
mkdir uploads
npm run create-admin  # Creates admin user (admin/admin123)
npm run dev
```

## 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

## 3. Access the Application

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000
- **Admin Login**: admin / admin123

## Default Admin Credentials
- Username: `admin`
- Password: `admin123`

**⚠️ Change the default password after first login!**

## Environment Variables (.env)

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/college-complaint-box
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in .env
- Verify MongoDB service status

### Port Already in Use
- Change PORT in .env file
- Kill existing processes on ports 3000/4200

### File Upload Issues
- Ensure uploads directory exists
- Check file size limits (5MB max)
- Verify file type restrictions

## Features Overview

✅ **Complete MEAN Stack Implementation**
✅ **Angular Material UI Components**
✅ **JWT Authentication**
✅ **File Upload Support**
✅ **Analytics Dashboard**
✅ **Responsive Design**
✅ **Error Handling**
✅ **TypeScript Throughout**
✅ **Security Middleware**
✅ **Comprehensive Documentation**

## Next Steps

1. Customize categories and departments
2. Add email notifications
3. Implement CAPTCHA
4. Add CSV/PDF export
5. Deploy to production

Happy coding! 🚀
















