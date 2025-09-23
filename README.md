# College Complaint Box - MEAN Stack Application

A comprehensive complaint management system built with Angular, Node.js, Express, and MongoDB. This application allows students and faculty to submit complaints and enables administrators to manage and track them efficiently.

## 🚀 Features

### For Students/Faculty:
- **Submit Complaints**: Easy-to-use form with file upload support
- **Track Status**: Real-time tracking of complaint status
- **Multiple Categories**: Academic, Infrastructure, Faculty, Administration, etc.
- **File Attachments**: Support for images, PDFs, and documents
- **Mobile Responsive**: Works seamlessly on all devices

### For Administrators:
- **Admin Dashboard**: Comprehensive analytics and management interface
- **Status Management**: Update complaint status (Pending → In Progress → Resolved)
- **Advanced Filtering**: Filter by status, category, department, role
- **Analytics Charts**: Visual representation of complaint data
- **Export Functionality**: CSV/PDF export capabilities
- **JWT Authentication**: Secure admin access

## 🛠️ Technology Stack

### Backend:
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing
- **Helmet** for security
- **Rate limiting** for API protection

### Frontend:
- **Angular 17** with standalone components
- **Angular Material** for UI components
- **TypeScript** for type safety
- **Chart.js** with ng2-charts for analytics
- **RxJS** for reactive programming
- **SCSS** for styling

## 📁 Project Structure

```
college-complaint-box/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── Complaint.ts
│   │   │   └── Admin.ts
│   │   ├── routes/
│   │   │   ├── complaintRoutes.ts
│   │   │   └── adminRoutes.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── upload.ts
│   │   └── server.ts
│   ├── uploads/
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── home/
│   │   │   │   ├── submit-complaint/
│   │   │   │   ├── track-complaint/
│   │   │   │   ├── admin-login/
│   │   │   │   └── admin-dashboard/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   └── interceptors/
│   │   ├── styles.scss
│   │   └── index.html
│   ├── package.json
│   └── angular.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

### 1. Clone the Repository
```bash
git clone <repository-url>
cd college-complaint-box
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env file with your configuration
# PORT=3000
# MONGODB_URI=mongodb://localhost:27017/college-complaint-box
# JWT_SECRET=your-super-secret-jwt-key-here
# NODE_ENV=development

# Create uploads directory
mkdir uploads

# Start MongoDB (if not running)
# On Windows: net start MongoDB
# On macOS: brew services start mongodb-community
# On Linux: sudo systemctl start mongod

# Run the backend server
npm run dev
```

The backend server will start on `http://localhost:3000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend application will start on `http://localhost:4200`

### 4. Create Admin Account

To create an admin account, you can use the API endpoint:

```bash
curl -X POST http://localhost:3000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

Or create it programmatically by adding this to your backend initialization.

## 📱 Usage

### For Students/Faculty:

1. **Submit a Complaint**:
   - Visit `http://localhost:4200`
   - Click "Submit Complaint"
   - Fill out the form with required details
   - Upload supporting documents (optional)
   - Submit and note your Complaint ID

2. **Track a Complaint**:
   - Click "Track Complaint"
   - Enter your Complaint ID
   - View status and resolution updates

### For Administrators:

1. **Login**:
   - Click "Admin Login"
   - Enter admin credentials
   - Access the dashboard

2. **Manage Complaints**:
   - View all complaints in the dashboard
   - Filter by status, category, department
   - Update complaint status
   - Add resolution notes
   - Delete spam complaints

3. **Analytics**:
   - View complaint statistics
   - Analyze trends by category
   - Monitor resolution rates

## 🔧 API Endpoints

### Complaints
- `POST /api/complaints` - Submit a new complaint
- `GET /api/complaints/:id` - Get complaint by ID
- `GET /api/complaints` - Get all complaints (admin only)
- `PUT /api/complaints/:id` - Update complaint status (admin only)
- `DELETE /api/complaints/:id` - Delete complaint (admin only)
- `GET /api/complaints/analytics/summary` - Get analytics data (admin only)

### Admin
- `POST /api/admin/login` - Admin login
- `POST /api/admin/create` - Create admin account
- `GET /api/admin/verify` - Verify JWT token

## 🛡️ Security Features

- **JWT Authentication** for admin routes
- **Password Hashing** with bcryptjs
- **Rate Limiting** to prevent abuse
- **CORS** configuration
- **Helmet** for security headers
- **File Upload Validation**
- **Input Validation** and sanitization

## 📊 Database Schema

### Complaint Model
```typescript
{
  role: 'student' | 'faculty',
  name?: string,
  department: string,
  category: string,
  title: string,
  description: string,
  fileUrl?: string,
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected',
  resolutionNote: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Admin Model
```typescript
{
  username: string,
  password: string (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Customization

### Adding New Categories
Edit the category options in:
- Backend: `backend/src/routes/complaintRoutes.ts`
- Frontend: `frontend/src/app/components/submit-complaint/submit-complaint.component.ts`

### Adding New Departments
Update department options in the same files as categories.

### Styling
Modify `frontend/src/styles.scss` for global styles or individual component styles.

## 🚀 Deployment

### Backend Deployment
1. Build the TypeScript code:
   ```bash
   cd backend
   npm run build
   ```

2. Set production environment variables
3. Deploy to your preferred platform (Heroku, AWS, DigitalOcean, etc.)

### Frontend Deployment
1. Build the Angular app:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔄 Future Enhancements

- [ ] Email notifications for status updates
- [ ] CAPTCHA integration for spam prevention
- [ ] Advanced reporting features
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Complaint escalation system
- [ ] Integration with college management systems

---

**Happy Coding! 🎉**
















