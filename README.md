# E-Learning Management System (LMS)

A comprehensive, modern full-stack E-Learning Management System enabling educational institutions, training centers, and online instructors to deliver learning content, conduct examinations, and manage students through a centralized platform.

## 🎯 Project Overview

This LMS platform provides:
- **Video-based Learning**: Stream and track video consumption
- **Online Examinations**: Create, schedule, and auto-grade exams
- **Digital Notes Distribution**: Manage and distribute PDF and DOCX materials
- **User Management**: Support for Students, Teachers, and Administrators
- **Course Management**: Comprehensive course lifecycle management
- **Progress Tracking**: Monitor student performance and learning progress
- **Reporting**: Detailed analytics and performance reports

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 14+
- **UI Library**: React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: ShadCN UI
- **State Management**: React Context / Zustand

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **API**: REST API
- **Authentication**: JWT

### Database
- **Primary**: PostgreSQL
- **ORM**: Prisma
- **Migrations**: Prisma Migrate

### Infrastructure
- **File Storage**: Local (Dev) / AWS S3 or Cloudinary (Prod)
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render / Railway / AWS EC2
- **Monitoring**: PM2 / Grafana

## 👥 User Roles

### 🎓 Student
- Register and login
- View enrolled courses
- Watch learning videos
- Access and download notes
- Take examinations
- View exam results
- Track learning progress
- Update profile and password

### 👨‍🏫 Teacher
- Secure login
- Create and manage courses
- Upload and manage videos
- Upload course notes
- Create and manage exams
- View student performance
- Review exam results
- Generate performance reports

### 🔐 Administrator
- Manage all users (Teachers and Students)
- Approve/suspend accounts
- Manage courses and content
- Monitor system activities
- Configure platform settings
- Generate system reports
- Backup and restore data
- Manage permissions and roles

## 📦 Core Modules

### 1. Authentication & Authorization
- User registration and login
- JWT authentication
- Password management (forgot/reset)
- Role-Based Access Control (RBAC)
- Secure session management

### 2. Course Management
- Create, update, delete courses
- Course categorization
- Student enrollment management
- Course search and filtering
- Course dashboard

### 3. Video Learning
- Upload and stream videos
- Video progress tracking
- Video categorization
- Playback controls and preview
- Integration with courses

### 4. Notes Management
- Upload PDF and DOCX notes
- Online note viewing
- Download capabilities
- Course-based organization
- Version management

### 5. Examination System
- Create exams with various question types:
  - Multiple Choice (Single/Multiple answers)
  - True/False
  - Short Answer
  - Essay
  - Fill in the Blank
- Schedule exams with start/end dates
- Configure exam settings:
  - Duration, passing percentage
  - Attempt limits
  - Negative marking (optional)
  - Random question/option order
- Automatic grading
- Time-limited exam execution

### 6. Result Management
- Student results display
- Teacher analytics
- Exam statistics
- Pass/Fail reports
- Performance charts and visualizations

### 7. Dashboard System

**Student Dashboard**
- Enrolled courses overview
- Course progress visualization
- Upcoming exams
- Recent exam results
- Notifications

**Teacher Dashboard**
- Total courses and students
- Uploaded videos count
- Exams created
- Student performance metrics

**Admin Dashboard**
- Total users, courses, teachers, students
- System-wide statistics
- User activity monitoring

### 8. Notification System
- Exam notifications
- Course updates
- Assignment alerts
- System announcements
- Email notifications

### 9. Reporting Module
- **Student Reports**: Course progress, exam performance
- **Teacher Reports**: Student analytics, course analytics
- **Admin Reports**: User activity, system usage, platform growth

## 📊 Database Schema

### Core Tables
- **users**: User accounts with roles and status
- **courses**: Course information and metadata
- **videos**: Learning video content
- **notes**: Course materials (PDF/DOCX)
- **exams**: Examination configurations
- **questions**: Exam questions with types
- **results**: Student exam results and scores

See [TECHNICAL.md](docs/TECHNICAL.md) for complete schema details.

## 🔌 API Endpoints

### Authentication
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
```

### Courses
```
GET    /api/v1/courses
POST   /api/v1/courses
PUT    /api/v1/courses/:id
DELETE /api/v1/courses/:id
```

### Videos
```
POST   /api/v1/videos/upload
GET    /api/v1/videos
DELETE /api/v1/videos/:id
```

### Notes
```
POST   /api/v1/notes/upload
GET    /api/v1/notes
DELETE /api/v1/notes/:id
```

### Exams
```
POST   /api/v1/exams
GET    /api/v1/exams
PUT    /api/v1/exams/:id
DELETE /api/v1/exams/:id
```

See [API.md](docs/API.md) for complete endpoint documentation.

## 🔒 Security Features

- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ HTTPS/TLS Encryption
- ✅ Rate Limiting
- ✅ Input Validation & Sanitization
- ✅ CSRF Protection
- ✅ XSS Protection
- ✅ Secure File Upload Validation
- ✅ Audit Logging
- ✅ SQL Injection Prevention (via Prisma)

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- PostgreSQL 14 or higher
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd eLearning
```

2. **Install dependencies**
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. **Environment Configuration**
```bash
# Copy environment templates
cp .env.example .env

# Edit .env files with your configuration
```

4. **Database Setup**
```bash
cd backend
npx prisma migrate dev --name init
npx prisma db seed  # Optional: load seed data
```

5. **Start Development Servers**
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev
# Runs at http://localhost:3000

# Terminal 2 - Backend
cd backend
npm run dev
# Runs at http://localhost:5000
```

## 📁 Project Structure

```
eLearning/
├── .github/
│   └── copilot-instructions.md
├── frontend/                    # Next.js application
│   ├── public/
│   ├── src/
│   │   ├── app/                # App router pages
│   │   ├── components/         # React components
│   │   │   ├── auth/
│   │   │   ├── courses/
│   │   │   ├── exams/
│   │   │   ├── videos/
│   │   │   ├── dashboards/
│   │   │   └── common/
│   │   ├── lib/                # Utilities
│   │   │   ├── api.ts          # API client
│   │   │   ├── auth.ts         # Auth utilities
│   │   │   └── utils.ts        # Helper functions
│   │   └── styles/
│   ├── .env.example
│   └── package.json
├── backend/                     # Express API
│   ├── src/
│   │   ├── routes/             # API routes
│   │   │   ├── auth.ts
│   │   │   ├── courses.ts
│   │   │   ├── exams.ts
│   │   │   ├── videos.ts
│   │   │   ├── notes.ts
│   │   │   ├── results.ts
│   │   │   └── users.ts
│   │   ├── controllers/        # Route handlers
│   │   ├── services/           # Business logic
│   │   ├── middleware/         # Express middleware
│   │   │   ├── auth.ts         # JWT verification
│   │   │   ├── errorHandler.ts
│   │   │   └── validation.ts
│   │   ├── utils/              # Utilities
│   │   │   ├── jwt.ts
│   │   │   ├── validators.ts
│   │   │   └── fileUpload.ts
│   │   └── server.ts           # Entry point
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── seed.ts             # Seed data
│   ├── .env.example
│   └── package.json
├── docs/
│   ├── TECHNICAL.md            # Architecture & schema
│   ├── API.md                  # API documentation
│   ├── DATABASE.md             # Database guide
│   ├── SECURITY.md             # Security documentation
│   └── DEPLOYMENT.md           # Deployment guide
└── README.md
```

## 📋 Key Features Checklist

- [x] User authentication (Register/Login/Reset Password)
- [x] Role-based access control (Student/Teacher/Admin)
- [x] Course management (CRUD operations)
- [x] Video upload and streaming
- [x] Notes management (PDF/DOCX)
- [x] Examination system with multiple question types
- [x] Auto-grading of exams
- [x] Result management and analytics
- [x] Student progress tracking
- [x] Dashboard for all user roles
- [x] Notification system
- [x] Reporting and analytics
- [x] Responsive design (Desktop/Tablet/Mobile)
- [x] JWT authentication on all APIs
- [x] Security best practices implementation

## 🔄 Git Workflow

### Branch Strategy
- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches (e.g., `feature/authentication`)

### Pull Request Process
1. Create feature branch from `develop`
2. Implement feature with tests
3. Create pull request
4. Code review and feedback
5. Address review comments
6. Merge to `develop` after approval
7. Create release from `develop` to `main`

## 📈 Success Metrics

- Number of active students
- Course completion rate
- Examination pass rate
- User satisfaction score (NPS)
- System uptime (target: 99.9%)
- Content consumption rate
- Student engagement metrics

## 💼 Business Benefits

- ✅ Reduced physical training costs
- ✅ Centralized learning management
- ✅ Enhanced student engagement
- ✅ Automated examination processes
- ✅ Real-time performance monitoring
- ✅ Increased accessibility to learning materials
- ✅ Scalable to multiple institutions

## 📖 Documentation

- [Technical Documentation](docs/TECHNICAL.md) - Architecture and system design
- [API Reference](docs/API.md) - Complete API endpoint documentation
- [Database Guide](docs/DATABASE.md) - Database schema and relationships
- [Security Guide](docs/SECURITY.md) - Security implementation details
- [Deployment Guide](docs/DEPLOYMENT.md) - Deployment instructions for different environments

## 🚢 Deployment

### Frontend Deployment
- Platform: Vercel
- Automatic deployments on push to `main`
- Environment variables for API endpoints

### Backend Deployment
- Options: Render, Railway, AWS EC2
- Database: Managed PostgreSQL
- Environment variables for secrets
- Health check endpoints

## 📞 Support & Contact

For issues, questions, or suggestions, please:
1. Check existing documentation
2. Create an issue in the repository
3. Contact the development team

## 📄 License

[Specify your license here]

## ✨ Acknowledgments

This project is built with modern technologies and follows industry best practices for building scalable, secure, and maintainable applications.

---

**Last Updated**: May 30, 2026

**Version**: 1.0.0-alpha
