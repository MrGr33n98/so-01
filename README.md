# Solar Admin Panel

Solar Admin Panel is a full-stack application that combines a Ruby on Rails API with a Next.js front end.
It is split into two main subprojects and can be run locally for development.

## Directory Structure

```
.
├── backend/               # Rails API
└── frontend/              # Next.js application or container directory
    └── meu-painel-next/   # Next.js project (if present)
```

The legacy `task-master` folder referenced in previous documentation has been removed.

## Prerequisites

- Ruby 3.2 or newer with Bundler
- Node.js 18 or newer with npm or yarn
- PostgreSQL running locally for the API database

## Setup

### Backend

1. Install dependencies
   ```bash
   cd backend
   bundle install
   ```
2. Prepare the database
   ```bash
   rails db:setup
   ```
3. Start the Rails server
   ```bash
   bin/dev
   # or
   rails server
   ```

### Frontend (Next.js)

If the Next.js project is located directly under `frontend/`:
```bash
cd frontend
npm install
npm run dev
```

If using the nested project:
```bash
cd frontend/meu-painel-next
npm install
npm run dev
```

## Development URLs

- Rails API: <http://localhost:3000>
- Next.js: <http://localhost:3001>

