# PersonDash - Modern User Management Dashboard# PersonDash - Modern User Management Dashboard



A beautiful, modern Next.js 15 application for managing user records with a comprehensive dashboard, analytics, and full CRUD operations.A beautiful, modern Next.js 15 application for managing user records with a comprehensive dashboard, analytics, and full CRUD operations.



## 🚀 Features## 🚀 Features



- **📊 Dashboard**: Beautiful tabbed interface with Overview, Analytics, and Management views- **📊 Dashboard**: Beautiful tabbed interface with Overview, Analytics, and Management views

- **👥 User Management**: Full CRUD operations for user records- **👥 User Management**: Full CRUD operations for user records

- **📈 Analytics**: Visual charts and statistics about your user base- **� Analytics**: Visual charts and statistics about your user base

- **🔍 Advanced Search**: Real-time search with filtering capabilities- **🔍 Advanced Search**: Real-time search with filtering capabilities

- **🗄️ Database**: PostgreSQL with Prisma ORM (Neon cloud ready)- **🔐 Authentication**: Secure authentication with NextAuth.js and Google OAuth

- **🎨 Modern UI**: Beautiful responsive design with Tailwind CSS and shadcn/ui- **�️ Database**: PostgreSQL with Prisma ORM (Neon cloud ready)

- **⚡ Performance**: Built with Next.js 15 and React 19- **🎨 Modern UI**: Beautiful responsive design with Tailwind CSS and shadcn/ui

- **⚡ Performance**: Built with Next.js 15 and React 19

## 🛠️ Tech Stack

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.0

- **Runtime**: React 19- **Framework**: Next.js 15.5.0

- **Database**: PostgreSQL (Neon)- **Runtime**: React 19

- **ORM**: Prisma- **Database**: PostgreSQL (Neon)

- **Styling**: Tailwind CSS- **ORM**: Prisma

- **UI Components**: Radix UI + shadcn/ui- **Authentication**: NextAuth.js v4 with Google OAuth

- **Form Handling**: React Hook Form + Zod- **Styling**: Tailwind CSS

- **Charts**: Recharts- **UI Components**: Radix UI + shadcn/ui

- **Icons**: Lucide React- **Form Handling**: React Hook Form + Zod

- **Charts**: Recharts

## 🚀 Quick Deploy to Vercel- **Icons**: Lucide React



[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/1314Saurav/person-search&env=DATABASE_URL)## 🚀 Quick Deploy to Vercel



### Environment Variables[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/1314Saurav/person-search&env=DATABASE_URL,NEXTAUTH_SECRET,NEXTAUTH_URL,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET)



Add this environment variable in Vercel:### Environment Variables



```envAdd these environment variables in Vercel:

# Database

DATABASE_URL="your-neon-postgres-connection-string"```env

```# Database

DATABASE_URL="your-neon-postgres-connection-string"

## 🏠 Local Development

# NextAuth Configuration

### PrerequisitesNEXTAUTH_URL="https://your-vercel-app.vercel.app"

NEXTAUTH_SECRET="your-random-secret-key"

- Node.js 18+

- PostgreSQL database (or Neon account)# Google OAuth

GOOGLE_CLIENT_ID="your-google-client-id"

### InstallationGOOGLE_CLIENT_SECRET="your-google-client-secret"

```

1. **Clone the repository**

   ```bash## 🏠 Local Development

   git clone https://github.com/1314Saurav/person-search.git

   cd person-search### Prerequisites

   ```

- Node.js 18+

2. **Install dependencies**- PostgreSQL database (or Neon account)

   ```bash- Google OAuth credentials

   npm install

   ```### Installation



3. **Set up environment variables**1. **Clone the repository**

   ```bash   ```bash

   cp .env.example .env   git clone https://github.com/1314Saurav/person-search.git

   ```   cd person-search

   Fill in your database connection string.   ```



4. **Set up the database**2. **Install dependencies**

   ```bash   ```bash

   npx prisma generate   npm install

   npx prisma migrate dev   ```

   npm run db:seed

   ```3. **Set up environment variables**

   ```bash

5. **Start the development server**   cp .env.example .env

   ```bash   ```

   npm run dev   Fill in your database and auth credentials.

   ```

4. **Set up the database**

Visit `http://localhost:3000` to see PersonDash in action.   ```bash

   npx prisma generate

## 📱 Application Features   npx prisma migrate dev

   npm run db:seed

### Dashboard Overview   ```

- **Quick Stats**: Total users, recent additions, engagement metrics

- **Visual Charts**: User growth trends and analytics5. **Start the development server**

- **Recent Activity**: Latest user registrations and updates   ```bash

   npm run dev

### Analytics View   ```

- **User Statistics**: Comprehensive metrics and insights

- **Growth Charts**: Visual representation of user base growthVisit `http://localhost:3000` to see PersonDash in action.

- **Engagement Data**: User activity and interaction patterns

## � Application Features

### Management View

- **User CRUD**: Create, Read, Update, Delete user records### Dashboard Overview

- **Bulk Operations**: Import/export user data- **Quick Stats**: Total users, recent additions, engagement metrics

- **Advanced Filtering**: Search and filter users by various criteria- **Visual Charts**: User growth trends and analytics

- **Form Validation**: Real-time validation with error handling- **Recent Activity**: Latest user registrations and updates



## 🗄️ Database Schema### Analytics View

- **User Statistics**: Comprehensive metrics and insights

```sql- **Growth Charts**: Visual representation of user base growth

-- Users Table- **Engagement Data**: User activity and interaction patterns

CREATE TABLE users (

  id          TEXT PRIMARY KEY,### Management View

  name        TEXT NOT NULL,- **User CRUD**: Create, Read, Update, Delete user records

  email       TEXT UNIQUE NOT NULL,- **Bulk Operations**: Import/export user data

  age         INTEGER,- **Advanced Filtering**: Search and filter users by various criteria

  bio         TEXT,- **Form Validation**: Real-time validation with error handling

  location    TEXT,

  occupation  TEXT,## 🗄️ Database Schema

  interests   TEXT[],

  website     TEXT,```sql

  linkedin    TEXT,-- Users Table (Application Data)

  twitter     TEXT,CREATE TABLE users (

  github      TEXT,  id          TEXT PRIMARY KEY,

  experience  TEXT,  name        TEXT NOT NULL,

  education   TEXT,  email       TEXT,

  skills      TEXT[],  phoneNumber TEXT NOT NULL,

  availableForWork BOOLEAN DEFAULT FALSE,  createdAt   TIMESTAMP DEFAULT NOW(),

  preferredContact TEXT DEFAULT 'email',  updatedAt   TIMESTAMP DEFAULT NOW()

  profileImage TEXT,);

  phone       TEXT,

  company     TEXT,-- Authentication Tables (NextAuth.js)

  jobTitle    TEXT,-- auth_users, Account, Session, VerificationToken

  createdAt   TIMESTAMP DEFAULT NOW(),```

  updatedAt   TIMESTAMP DEFAULT NOW()

);## 🔧 Configuration

```

### Google OAuth Setup

## 📁 Project Structure

1. Go to [Google Cloud Console](https://console.cloud.google.com/)

```2. Create OAuth 2.0 credentials

├── app/3. Add authorized redirect URIs:

│   ├── actions/           # Server actions for CRUD operations   - `http://localhost:3000/api/auth/callback/google` (development)

│   ├── api/              # API routes (users)   - `https://your-domain.vercel.app/api/auth/callback/google` (production)

│   ├── components/       # Application components

│   │   ├── dashboard-view.tsx## 📁 Project Structure

│   │   ├── analytics-view.tsx

│   │   ├── management-view.tsx```

│   │   └── dashboard-tabs.tsx├── app/

│   ├── about/            # About page│   ├── actions/           # Server actions for CRUD operations

│   └── globals.css       # Global styles│   ├── api/              # API routes (auth, users)

├── components/│   ├── auth/             # Authentication pages

│   ├── ui/               # shadcn/ui components│   ├── components/       # Application components

│   └── theme-provider.tsx│   │   ├── dashboard-view.tsx

├── lib/│   │   ├── analytics-view.tsx

│   ├── prisma.ts        # Prisma client│   │   ├── management-view.tsx

│   └── utils.ts         # Utility functions│   │   └── dashboard-tabs.tsx

├── prisma/│   ├── about/            # About page

│   ├── schema.prisma    # Database schema│   └── globals.css       # Global styles

│   └── migrations/      # Database migrations├── components/

```│   ├── ui/               # shadcn/ui components

│   └── theme-provider.tsx

## 🚦 Available Scripts├── lib/

│   ├── auth.ts          # NextAuth configuration

- `npm run dev` - Start development server│   ├── prisma.ts        # Prisma client

- `npm run build` - Build for production│   └── utils.ts         # Utility functions

- `npm run start` - Start production server├── prisma/

- `npm run lint` - Run ESLint│   ├── schema.prisma    # Database schema

- `npm run db:seed` - Seed database with sample data│   └── migrations/      # Database migrations

└── types/

## 🤝 Contributing    └── next-auth.d.ts   # NextAuth type definitions

```

Contributions are welcome! Please feel free to submit a Pull Request.

## 🚦 Available Scripts

## 📄 License

- `npm run dev` - Start development server

This project is open source and available under the [MIT License](LICENSE).- `npm run build` - Build for production

- `npm run start` - Start production server

---- `npm run lint` - Run ESLint

- `npm run db:seed` - Seed database with sample data

Built with ❤️ using Next.js 15, React 19, and modern web technologies.

## 🤝 Contributing

**PersonDash** - Your modern solution for user management and analytics.
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js 15, React 19, and modern web technologies.

**PersonDash** - Your modern solution for user management and analytics.

