# Solar Admin Panel

Full-stack admin panel built with Rails and Next.js.

## Development Workflow

### Branch Structure
- `main` - Production-ready code
- `develop` - Development integration
- `feature/*` - New features
- `fix/*` - Bug fixes

### Getting Started

1. Clone the repository:
```bash
git clone git@github.com:MrGr33n98/so-01.git
cd so-01
```

2. Backend Setup:
```bash
cd backend
bundle install
rails db:setup
rails s
```

3. Frontend Setup:
```bash
cd frontend
npm install
npm run dev
```

### Development Process

1. Create feature branch:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

2. Make changes and commit:
```bash
git add .
git commit -m "feat: add your feature"
```

3. Push and create PR:
```bash
git push origin feature/your-feature-name
```

## Development URLs
- Backend API: http://localhost:3000
- Frontend: http://localhost:3001
- Admin Panel: http://localhost:3000/admin

## Tech Stack
- Backend: Rails 7, PostgreSQL, Active Admin
- Frontend: Next.js 14, TypeScript, Tailwind CSS