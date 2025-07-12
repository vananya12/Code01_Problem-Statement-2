#!/bin/bash

# StackIt Deployment Script
# This script helps deploy the StackIt application

set -e

echo "🚀 Starting StackIt deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists
if [ ! -f "server/.env" ]; then
    print_warning "No .env file found in server directory."
    print_status "Creating .env file from example..."
    cp server/env.example server/.env
    print_warning "Please edit server/.env with your production values before continuing."
    read -p "Press Enter to continue after editing .env file..."
fi

# Build and start services
print_status "Building Docker images..."
docker-compose build

print_status "Starting services..."
docker-compose up -d

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 10

# Check if services are running
print_status "Checking service health..."

# Check MongoDB
if docker-compose exec -T mongodb mongosh --eval "db.runCommand('ping')" > /dev/null 2>&1; then
    print_status "✅ MongoDB is running"
else
    print_error "❌ MongoDB is not responding"
    exit 1
fi

# Check Backend API
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    print_status "✅ Backend API is running"
else
    print_error "❌ Backend API is not responding"
    exit 1
fi

# Check Frontend
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    print_status "✅ Frontend is running"
else
    print_error "❌ Frontend is not responding"
    exit 1
fi

print_status "🎉 StackIt deployment completed successfully!"
echo ""
echo "📱 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo "   API Health Check: http://localhost:5000/api/health"
echo ""
echo "🔧 Useful commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   Update and redeploy: ./deploy.sh"
echo ""
print_status "Happy coding! 🚀" 