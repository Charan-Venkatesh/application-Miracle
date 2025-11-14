#!/bin/bash

# Supabase Setup Verification Script
# This script helps verify your Supabase configuration

echo "================================================"
echo "🔍 Supabase Configuration Checker"
echo "================================================"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "   Creating .env file..."
    cat > .env << 'EOF'
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
EOF
    echo "✅ .env file created. Please update it with your credentials."
    exit 1
fi

# Read .env file
source .env

echo "📋 Current Configuration:"
echo "------------------------"
echo "SUPABASE_URL: $VITE_SUPABASE_URL"
echo "ANON_KEY: ${VITE_SUPABASE_ANON_KEY:0:20}..." 
echo ""

# Check if placeholders are still present
if [[ "$VITE_SUPABASE_URL" == *"your-project-id"* ]]; then
    echo "⚠️  URL contains placeholder values"
    echo ""
    echo "📝 To fix this:"
    echo "   1. Go to https://app.supabase.com"
    echo "   2. Open your project"
    echo "   3. Go to Settings → API"
    echo "   4. Copy 'Project URL' and 'anon public' key"
    echo "   5. Update .env file with these values"
    echo ""
    exit 1
fi

if [[ "$VITE_SUPABASE_ANON_KEY" == *"your-anon-key"* ]]; then
    echo "⚠️  Anon key contains placeholder values"
    echo ""
    echo "📝 To fix this:"
    echo "   1. Go to https://app.supabase.com"
    echo "   2. Open your project"
    echo "   3. Go to Settings → API"
    echo "   4. Copy 'anon public' key"
    echo "   5. Update .env file"
    echo ""
    exit 1
fi

echo "✅ Configuration looks valid!"
echo ""
echo "🔄 Next Steps:"
echo "   1. Run database migration in Supabase SQL Editor"
echo "   2. Create test users in Supabase Authentication"
echo "   3. Run seed script to link users"
echo "   4. Restart dev server: npm run dev"
echo ""
echo "================================================"
