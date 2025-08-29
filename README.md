# PersonDash - Modern User Management Dashboard

A beautiful, modern Next.js 15 application for managing user records with a comprehensive dashboard, analytics, and full CRUD operations.

## 🚀 Features

- **📊 Dashboard**: Beautiful tabbed interface with Overview, Analytics, and Management views
- **👥 User Management**: Full CRUD operations for user records
- **� Analytics**: Visual charts and statistics about your user base
- **🔍 Advanced Search**: Real-time search with filtering capabilities
- **🔐 Authentication**: Secure authentication with NextAuth.js and Google OAuth
- **�️ Database**: PostgreSQL with Prisma ORM (Neon cloud ready)
- **🎨 Modern UI**: Beautiful responsive design with Tailwind CSS and shadcn/ui
- **⚡ Performance**: Built with Next.js 15 and React 19

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.0
- **Runtime**: React 19
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: NextAuth.js v4 with Google OAuth
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Form Handling**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/1314Saurav/person-search&env=DATABASE_URL,NEXTAUTH_SECRET,NEXTAUTH_URL,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET)

### Environment Variables

Add these environment variables in Vercel:

```env
# Database
DATABASE_URL="your-neon-postgres-connection-string"

# NextAuth Configuration
NEXTAUTH_URL="https://your-vercel-app.vercel.app"
NEXTAUTH_SECRET="your-random-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## 🏠 Local Development

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Neon account)
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/1314Saurav/person-search.git
   cd person-search
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your database and auth credentials.

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see PersonDash in action.

## � Application Features

### Dashboard Overview
- **Quick Stats**: Total users, recent additions, engagement metrics
- **Visual Charts**: User growth trends and analytics
- **Recent Activity**: Latest user registrations and updates

### Analytics View
- **User Statistics**: Comprehensive metrics and insights
- **Growth Charts**: Visual representation of user base growth
- **Engagement Data**: User activity and interaction patterns

### Management View
- **User CRUD**: Create, Read, Update, Delete user records
- **Bulk Operations**: Import/export user data
- **Advanced Filtering**: Search and filter users by various criteria
- **Form Validation**: Real-time validation with error handling

## 🗄️ Database Schema

```sql
-- Users Table (Application Data)
CREATE TABLE users (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT,
  phoneNumber TEXT NOT NULL,
  createdAt   TIMESTAMP DEFAULT NOW(),
  updatedAt   TIMESTAMP DEFAULT NOW()
);

-- Authentication Tables (NextAuth.js)
-- auth_users, Account, Session, VerificationToken
```

## 🔧 Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.vercel.app/api/auth/callback/google` (production)

## 📁 Project Structure

```
├── app/
│   ├── actions/           # Server actions for CRUD operations
│   ├── api/              # API routes (auth, users)
│   ├── auth/             # Authentication pages
│   ├── components/       # Application components
│   │   ├── dashboard-view.tsx
│   │   ├── analytics-view.tsx
│   │   ├── management-view.tsx
│   │   └── dashboard-tabs.tsx
│   ├── about/            # About page
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # shadcn/ui components
│   └── theme-provider.tsx
├── lib/
│   ├── auth.ts          # NextAuth configuration
│   ├── prisma.ts        # Prisma client
│   └── utils.ts         # Utility functions
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
└── types/
    └── next-auth.d.ts   # NextAuth type definitions
```

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed database with sample data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js 15, React 19, and modern web technologies.

**PersonDash** - Your modern solution for user management and analytics.

