# E-Learning Management System (LMS) - Copilot Instructions

## Project Overview
Full-stack E-Learning Management System built with Next.js (frontend), Node.js/Express (backend), PostgreSQL (database), and Prisma ORM.

### Tech Stack
- **Frontend**: Next.js 14+, React 18+, TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **File Storage**: Local/AWS S3/Cloudinary

## Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Quick Start

1. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

2. **Environment Setup**
   - Copy `.env.example` to `.env` in both frontend and backend
   - Configure database connection
   - Set JWT secrets

3. **Database Setup**
   ```bash
   cd backend
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

4. **Run Development Servers**
   ```bash
   # Terminal 1 - Frontend
   cd frontend
   npm run dev

   # Terminal 2 - Backend
   cd backend
   npm run dev
   ```

## Project Structure

```
eLearning/
├── frontend/              # Next.js application
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities and helpers
│   │   └── styles/        # Global styles
│   └── package.json
├── backend/               # Express API server
│   ├── src/
│   │   ├── routes/        # API endpoints
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── services/      # Business logic
│   │   ├── models/        # Prisma models
│   │   └── utils/         # Utilities
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
│   └── package.json
├── docs/                  # Documentation
└── README.md
```

## Key Features

### Core Modules
1. **Authentication & Authorization** - JWT, RBAC
2. **Course Management** - CRUD operations, enrollment
3. **Video Learning** - Upload, stream, track progress
4. **Notes Management** - PDF/DOCX upload, version control
5. **Examination System** - Create, schedule, auto-grade
6. **Result Management** - Analytics and reporting
7. **Dashboard** - Role-based views (Student/Teacher/Admin)
8. **Notifications** - Exam alerts, updates
9. **Reporting Module** - Performance reports

### User Roles
- **Student**: Learn, take exams, track progress
- **Teacher**: Create courses, upload content, manage exams
- **Admin**: Manage all users, courses, system settings

## Development Guidelines

### Code Organization
- Use TypeScript for type safety
- Follow RESTful API conventions
- Implement proper error handling
- Use Prisma ORM for database queries
- Keep components modular and reusable

### Security Requirements
- JWT authentication on all protected routes
- Password hashing with bcrypt
- Input validation on all endpoints
- HTTPS in production
- Rate limiting on API endpoints
- CSRF and XSS protection

### API Conventions
- Base URL: `/api/v1`
- Authentication: `Authorization: Bearer <token>`
- Response format: JSON with status codes
- Error responses: Include error message and code

## Deployment

### Frontend
- Deploy to Vercel
- Environment variables for API endpoints
- SEO optimization

### Backend
- Deploy to Render, Railway, or AWS EC2
- PostgreSQL database on managed service
- Environment variables for secrets

## Contributing

1. Create feature branch from `develop`
2. Follow conventional commits
3. Submit PR for code review
4. Ensure all tests pass

## Support

Refer to [TECHNICAL.md](../docs/TECHNICAL.md) for architecture details and [API.md](../docs/API.md) for endpoint documentation.
