#!/bin/bash

# Vercel Deployment Troubleshooting Script
echo "🔧 Vercel Deployment Troubleshooting Script"
echo "=============================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
    echo "❌ vercel.json not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Vercel CLI found"
echo "✅ vercel.json found"

# Check if backend API file exists
if [ ! -f "backend/api/index.js" ]; then
    echo "❌ backend/api/index.js not found"
    exit 1
fi

echo "✅ backend/api/index.js found"

# Check if frontend builds successfully
echo "🔨 Testing frontend build..."
cd frontend
if npm run vercel-build; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    exit 1
fi

# Check if backend builds successfully
echo "🔨 Testing backend build..."
cd ../backend
if npm run build; then
    echo "✅ Backend build successful"
else
    echo "❌ Backend build failed"
    exit 1
fi

cd ..

echo ""
echo "🎯 All checks passed! Ready for deployment."
echo ""
echo "📋 Next steps:"
echo "1. Set environment variables in Vercel dashboard:"
echo "   - MONGODB_URI: Your MongoDB Atlas connection string"
echo "   - JWT_SECRET: A strong secret key (32+ characters)"
echo "   - FRONTEND_URL: Your Vercel app URL"
echo "   - NODE_ENV: production"
echo ""
echo "2. Deploy with a unique project name:"
echo "   vercel --name compliantbox-2024"
echo ""
echo "3. Or deploy normally and choose a unique name:"
echo "   vercel"
echo ""
echo "📚 For detailed troubleshooting, see VERCEL_ERROR_TROUBLESHOOTING.md"
