# Vercel Deployment Error Troubleshooting Guide

## 🚨 Common Vercel Errors and Solutions

### **Function-Related Errors (500/502/504)**

#### `FUNCTION_INVOCATION_FAILED` (500)
**Cause**: Backend function is failing to execute
**Solutions**:
1. Check if `backend/api/index.js` exists and is properly configured
2. Verify all dependencies are installed
3. Check MongoDB connection string
4. Review function logs in Vercel dashboard

#### `FUNCTION_INVOCATION_TIMEOUT` (504)
**Cause**: Function taking too long to execute
**Solutions**:
1. Increase timeout in `vercel.json`:
   ```json
   {
     "builds": [
       {
         "src": "backend/api/index.js",
         "use": "@vercel/node",
         "config": {
           "maxDuration": 60
         }
       }
     ]
   }
   ```

#### `NO_RESPONSE_FROM_FUNCTION` (502)
**Cause**: Function not returning proper response
**Solutions**:
1. Ensure `module.exports = app` in `backend/api/index.js`
2. Check if Express app is properly configured
3. Verify all routes are working

### **Deployment Errors (403/404/410)**

#### `DEPLOYMENT_BLOCKED` (403)
**Cause**: Deployment blocked by Vercel
**Solutions**:
1. Check if you have exceeded deployment limits
2. Verify your Vercel plan allows deployments
3. Check for any security restrictions

#### `DEPLOYMENT_NOT_FOUND` (404)
**Cause**: Deployment doesn't exist
**Solutions**:
1. Redeploy the project
2. Check if the deployment was deleted
3. Verify project name is correct

### **Routing Errors (502)**

#### `ROUTER_CANNOT_MATCH` (502)
**Cause**: Vercel can't match routes properly
**Solutions**:
1. Check `vercel.json` routing configuration
2. Ensure routes are properly defined
3. Verify build outputs exist

## 🔧 Quick Fixes

### **1. Update vercel.json for Better Error Handling**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist",
        "buildCommand": "npm run vercel-build"
      }
    },
    {
      "src": "backend/api/index.js",
      "use": "@vercel/node",
      "config": {
        "maxDuration": 60,
        "memory": 1024
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/dist/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### **2. Fix Backend API Entry Point**
Ensure `backend/api/index.js` is properly configured:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const complaintRoutes = require('../dist/routes/complaintRoutes');
const adminRoutes = require('../dist/routes/adminRoutes');
const errorHandler = require('../dist/middleware/errorHandler');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/complaints', complaintRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use(errorHandler);

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable is required');
    }
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Initialize database connection
connectDB();

// Export for Vercel
module.exports = app;
```

### **3. Check Environment Variables**
Ensure these are set in Vercel dashboard:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/college-complaint-box
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
FRONTEND_URL=https://your-project-name.vercel.app
NODE_ENV=production
```

## 🚀 Step-by-Step Recovery

### **1. Clean Deployment**
```bash
# Remove any existing Vercel configuration
rm -rf .vercel

# Redeploy with fresh configuration
vercel --name your-unique-project-name --force
```

### **2. Check Build Logs**
1. Go to Vercel dashboard
2. Click on your project
3. Go to "Functions" tab
4. Check logs for specific errors

### **3. Test Locally First**
```bash
# Test backend locally
cd backend
npm run build
node dist/server.js

# Test frontend build
cd ../frontend
npm run vercel-build
```

### **4. Alternative Deployment Method**
If builds approach fails, try functions approach:

```json
{
  "version": 2,
  "functions": {
    "backend/api/index.js": {
      "maxDuration": 60
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/dist/$1"
    }
  ]
}
```

## 📞 Getting Help

### **Vercel Support**
- Check Vercel dashboard logs
- Contact Vercel support for platform errors
- Check Vercel status page for outages

### **Debug Commands**
```bash
# Check Vercel logs
vercel logs

# Test deployment locally
vercel dev

# Check function status
vercel functions list
```

## 🎯 Most Likely Solutions

1. **Update `vercel.json`** with the improved configuration above
2. **Check environment variables** are properly set
3. **Verify `backend/api/index.js`** exists and is correct
4. **Increase function timeout** to 60 seconds
5. **Redeploy** with a unique project name

Try these solutions in order, and your deployment should succeed!
