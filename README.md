# StackIt - Modern Q&A Platform

A full-stack Q&A platform built with React, Node.js, and MongoDB, inspired by Stack Overflow. StackIt provides a modern, responsive interface for asking questions, providing answers, and building a community of knowledge sharing.

## 🚀 Features

### Core Functionality
- **User Authentication**: JWT-based authentication with registration and login
- **Question Management**: Create, edit, and delete questions with rich text editing
- **Answer System**: Post answers with voting and acceptance functionality
- **Voting System**: Upvote/downvote questions and answers
- **Tag System**: Categorize questions with tags
- **Search & Filtering**: Advanced search with filters for sorting and filtering
- **Real-time Notifications**: Socket.io powered notifications for new answers and mentions
- **Responsive Design**: Mobile-first design with Tailwind CSS

### Advanced Features
- **Rich Text Editor**: React Quill integration with formatting options
- **User Profiles**: Detailed user profiles with reputation system
- **Pagination**: Efficient pagination for large datasets
- **Admin Panel**: Role-based access control (extensible)
- **API Rate Limiting**: Built-in rate limiting for API endpoints
- **Security**: Helmet.js, CORS, input validation, and sanitization

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Quill** - Rich text editor
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Socket.io** - Real-time server
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd StackIt
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp server/env.example server/.env
   
   # Edit the environment variables
   nano server/.env
   ```

4. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

5. **Seed the database (optional)**
   ```bash
   cd server
   npm run seed
   ```

6. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately
   npm run server  # Backend on port 5000
   npm run client  # Frontend on port 3000
   ```

7. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/stackit

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Database Setup

1. **Install MongoDB** (if not already installed)
   - [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

2. **Create database**
   ```bash
   mongosh
   use stackit
   ```

3. **Seed with sample data**
   ```bash
   cd server
   npm run seed
   ```

## 📱 Usage

### For Users

1. **Registration/Login**
   - Create an account or log in with existing credentials
   - Demo accounts available after seeding:
     - alice@example.com / password123
     - bob@example.com / password123

2. **Asking Questions**
   - Click "Ask Question" button
   - Fill in title, description, and tags
   - Use the rich text editor for formatting

3. **Answering Questions**
   - Browse questions on the home page
   - Click on a question to view details
   - Scroll down to the answer section
   - Use the rich text editor to compose your answer

4. **Voting**
   - Upvote/downvote questions and answers
   - One vote per user per item
   - Build reputation through helpful contributions

### For Developers

1. **API Endpoints**
   - Authentication: `/api/auth/*`
   - Questions: `/api/questions/*`
   - Answers: `/api/answers/*`
   - Users: `/api/users/*`
   - Notifications: `/api/notifications/*`

2. **Real-time Features**
   - Socket.io integration for live notifications
   - Automatic updates for new answers and votes

## 🏗️ Project Structure

```
StackIt/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── server.js           # Main server file
│   ├── seed.js             # Database seeder
│   └── package.json
├── package.json            # Root package.json
└── README.md
```

## 🔌 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Questions Endpoints

- `GET /api/questions` - Get all questions with filters
- `GET /api/questions/:id` - Get specific question
- `POST /api/questions` - Create new question
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question
- `POST /api/questions/:id/vote` - Vote on question

### Answers Endpoints

- `POST /api/answers` - Create new answer
- `PUT /api/answers/:id` - Update answer
- `DELETE /api/answers/:id` - Delete answer
- `POST /api/answers/:id/vote` - Vote on answer
- `POST /api/answers/:id/accept` - Accept answer

## 🚀 Deployment

### Production Build

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Set production environment variables**
   ```bash
   NODE_ENV=production
   MONGODB_URI=your-production-mongodb-uri
   JWT_SECRET=your-production-jwt-secret
   ```

3. **Deploy to your preferred platform**
   - Heroku
   - Vercel
   - AWS
   - DigitalOcean

### Docker Deployment

1. **Build Docker images**
   ```bash
   docker build -t stackit-server ./server
   docker build -t stackit-client ./client
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Stack Overflow
- Built with modern web technologies
- Open source community contributions

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/your-repo/stackit/issues) page
2. Create a new issue for bugs or feature requests
3. Contact the maintainers

---

**Happy coding! 🚀** 