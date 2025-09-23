#!/bin/bash

# CompliantBox Vercel Deployment Script
echo "🚀 Preparing CompliantBox for Vercel Deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build
echo "✅ Frontend build complete"

# Build backend
echo "📦 Building backend..."
cd ../backend
npm install
npm run build
echo "✅ Backend build complete"

# Go back to root
cd ..

# Check if vercel.json exists
if [ ! -f "vercel.json" ]; then
    echo "❌ vercel.json not found. Please ensure it exists in the root directory."
    exit 1
fi

echo "✅ All builds complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Go to vercel.com/dashboard"
echo "3. Click 'New Project'"
echo "4. Import your GitHub repository"
echo "5. Configure environment variables:"
echo "   - MONGODB_URI: Your MongoDB Atlas connection string"
echo "   - JWT_SECRET: A strong secret key (32+ characters)"
echo "   - FRONTEND_URL: Your Vercel app URL"
echo "6. Deploy!"
echo ""
echo "📚 See VERCEL_DEPLOYMENT.md for detailed instructions"
