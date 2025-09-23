# Vercel Deployment Guide for CompliantBox

## Prerequisites
1. Vercel account (sign up at vercel.com)
2. MongoDB Atlas account (for production database)
3. GitHub repository with your code

## Step 1: Prepare Your Repository

### Frontend Configuration
- ✅ Updated `frontend/package.json` with production build script
- ✅ Updated `frontend/angular.json` with correct output path
- ✅ Frontend builds to `dist/` directory

### Backend Configuration
- ✅ Created `backend/api/index.js` for Vercel serverless functions
- ✅ Updated `backend/package.json` with Vercel build script
- ✅ Backend compiled to `dist/` directory

## Step 2: Environment Variables

Set these environment variables in Vercel dashboard:

### Required Variables:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/college-complaint-box?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
FRONTEND_URL=https://your-app-name.vercel.app
```

### Optional Variables:
```
MAX_FILE_SIZE=10485760
UPLOAD_PATH=uploads
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
```

## Step 3: Deploy to Vercel

### Method 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy with custom name (if project name exists)
vercel --name your-unique-project-name

# Or deploy normally and choose name during setup
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: [choose unique name like compliantbox-2024]
# - Directory: ./
# - Override settings? No
```

### Method 2: GitHub Integration
1. Push code to GitHub repository
2. Go to vercel.com/dashboard
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - Framework Preset: Other
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm install`

## Step 4: Configure Build Settings

### Root Directory Build Settings:
- Build Command: `cd frontend && npm run vercel-build && cd ../backend && npm run build`
- Output Directory: `frontend/dist`
- Install Command: `cd frontend && npm install && cd ../backend && npm install`

### CSS Bundle Size Fix:
The Angular configuration has been updated to handle larger CSS bundles:
- Component styles budget increased to 20kb (from 4kb)
- Initial bundle budget increased to 5mb (from 1mb)
- Added production optimizations for better performance

### Environment Variables:
Add all required environment variables in Vercel dashboard under Settings > Environment Variables.

## Step 5: Database Setup

### MongoDB Atlas:
1. Create a new cluster
2. Create a database user
3. Whitelist Vercel IP addresses (0.0.0.0/0 for all)
4. Get connection string and add to MONGODB_URI

### Create Admin User:
After deployment, you can create an admin user by running:
```bash
# Using Vercel CLI
vercel env pull .env.local
cd backend
npm run create-admin
```

## Step 6: File Uploads

Vercel has limitations for file uploads in serverless functions:
- Files are stored temporarily
- Consider using cloud storage (AWS S3, Cloudinary) for production
- Current setup works for small files (< 10MB)

## Step 7: Domain Configuration

1. Go to Vercel dashboard
2. Select your project
3. Go to Settings > Domains
4. Add your custom domain (optional)

## Troubleshooting

### Common Issues:
1. **Build Failures**: Check build logs in Vercel dashboard
2. **Database Connection**: Verify MONGODB_URI format
3. **CORS Issues**: Update FRONTEND_URL environment variable
4. **File Uploads**: Check file size limits and storage
5. **CSS Bundle Size Errors**: Fixed by updating angular.json budgets
6. **Project Name Conflicts**: Use `vercel --name unique-name` or choose different name

### Debug Commands:
```bash
# Check Vercel logs
vercel logs

# Test locally with Vercel
vercel dev
```

## Production Checklist

- [ ] Environment variables configured
- [ ] MongoDB Atlas database ready
- [ ] Frontend builds successfully
- [ ] Backend API endpoints working
- [ ] File uploads functional
- [ ] Admin user created
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic with Vercel)

## Support

For issues:
1. Check Vercel dashboard logs
2. Verify environment variables
3. Test API endpoints with Postman/curl
4. Check MongoDB Atlas connection

Your app will be available at: `https://your-project-name.vercel.app`
